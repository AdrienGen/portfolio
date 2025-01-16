import { useEffect } from 'react';

// ---------------------------------------------------------------------------------------------------- //
// ----------------------------------------------- CURSOR --------------------------------------------- //
// ---------------------------------------------------------------------------------------------------- //

export default function Cursor() {

    useEffect(() => {

        const cursor = document.getElementById('cursor') as HTMLElement;

        // Smoothing factor for cursor movement speed (0 = smoother, 1 = instant)
        const speed = 0.16;

        const mouse = { x: 0, y: 0 };
        const circle = { x: 0, y: 0 };
        const previousCircle = { x: 0, y: 0 };

        let currentScale = 0;
        let currentAngle = 0;

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        const tick = () => {

            circle.x += (mouse.x - circle.x) * speed;
            circle.y += (mouse.y - circle.y) * speed;

            const deltaCircleX = circle.x - previousCircle.x;
            const deltaCircleY = circle.y - previousCircle.y;

            previousCircle.x = mouse.x;
            previousCircle.y = mouse.y;

            const mouseVelocity = Math.min(Math.sqrt(deltaCircleX ** 2 + deltaCircleY ** 2) * 4, 150);
            const scaleValue = (mouseVelocity / 150) * 0.5;

            currentScale += (scaleValue - currentScale) * speed;

            if (mouseVelocity > 20) {
                currentAngle = Math.atan2(deltaCircleY, deltaCircleX);
            }

            cursor.style.transform = `translate(${circle.x}px, ${circle.y}px) rotate(${currentAngle}rad) scale(${1 + currentScale}, ${1 - currentScale})`;
            window.requestAnimationFrame(tick);
        }

        tick();

    }, []);

    return (
        <div
            id="cursor"
            className="border border-zinc-950 dark:border-zinc-50 transition-colors duration-500"
        />
    )
}
