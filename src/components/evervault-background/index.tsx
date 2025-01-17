import { useState, useEffect, useContext } from 'react';
import { useMotionTemplate, motion, useMotionValue } from 'framer-motion';
import { AppContext, IAppContext } from '../../App';
import WhiteLogo from '../../assets/images/white-logo-without-bg.svg?react';
import BlackLogo from '../../assets/images/black-logo-without-bg.svg?react';

// ---------------------------------------------------------------------------------------------------- //
// --------------------------------------- EVERVAULT BACKGROUND --------------------------------------- //
// ---------------------------------------------------------------------------------------------------- //

export default function EvervaultBackground() {

    const { colorScheme } = useContext(AppContext) as IAppContext;

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [randomString, setRandomString] = useState('');

    useEffect(() => {
        const str = generateRandomString(20000);
        setRandomString(str);
    }, []);

    function onMouseMove({ currentTarget, clientX, clientY }: any) {

        const { left, top } = currentTarget.getBoundingClientRect();

        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    function onClick() {

        const audio = document.getElementById('background-music') as HTMLAudioElement;
        audio.play();

        const aside = document.getElementById('opening-aside') as HTMLDivElement;
        aside.classList.remove('opacity-100');
        aside.classList.add('opacity-0', 'pointer-events-none');
    }

    return (
        <aside
            id="opening-aside"
            className="fixed z-30 inset-0 flex items-center justify-center transition-opacity duration-500 opacity-100 bg-zinc-50 dark:bg-zinc-950"
        >
            <div
                onMouseMove={onMouseMove}
                className="group/card relative flex items-center justify-center w-full h-full"
            >
                <Pattern
                    mouseX={mouseX}
                    mouseY={mouseY}
                    randomString={randomString}
                />
                <div className="relative z-40 flex items-center justify-center">
                    <button
                        onClick={onClick}
                        className="relative flex items-center justify-center h-44 w-44 rounded-full"
                    >
                        <div className="absolute w-full h-full rounded-full blur-sm bg-zinc-50/[0.8] dark:bg-zinc-950/[0.8]" />
                        <span className="z-20 font-bold text-xl text-black dark:text-white">
                            {colorScheme === 'dark' ? (
                                <WhiteLogo className="h-36 w-36" />
                            ) : (
                                <BlackLogo className="h-36 w-36" />
                            )}
                        </span>
                    </button>
                </div>
            </div>
        </aside>
    )
}

// ---------------------------------------------------------------------------------------------------- //
// ---------------------------------------------- PATTERN --------------------------------------------- //
// ---------------------------------------------------------------------------------------------------- //

function Pattern({ mouseX, mouseY, randomString }: any) {

    const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
    const style = { maskImage, WebkitMaskImage: maskImage };

    return (
        <div className="pointer-events-none">
            <div
                className="absolute inset-0 [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"
            />
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-700 opacity-0 group-hover/card:opacity-100 backdrop-blur-xl transition duration-500"
                style={style}
            />
            <motion.div
                className="absolute inset-0 opacity-0 mix-blend-overlay group-hover/card:opacity-100"
                style={style}
            >
                <div className="absolute inset-x-0 text-xs h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500">
                    {randomString}
                </div>
            </motion.div>
        </div>
    )
}

// ---------------------------------------------------------------------------------------------------- //
// ------------------------------------------ RANDOM STRING ------------------------------------------- //
// ---------------------------------------------------------------------------------------------------- //

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const generateRandomString = (length: number) => {
    let result = '';
    for (let i = 0; i < length; i++) {
        if (i % 500 === 0) {
            result += 'aDRieNgeNdronnEAu';
        }
        else {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    }
    return result;
}
