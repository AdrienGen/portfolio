import { PropsWithChildren } from 'react';
import { cn } from '../../lib/utils';

interface IAuroraBackgroundProps extends PropsWithChildren {
    showRadialGradient: boolean;
}

// ---------------------------------------------------------------------------------------------------- //
// ----------------------------------------- AURORA BACKGROUND ---------------------------------------- //
// ---------------------------------------------------------------------------------------------------- //

export default function AuroraBackground(props: IAuroraBackgroundProps) {
    return (
        <div className="flex-1 flex flex-col bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500">
            <div className="fixed z-0 inset-0 overflow-hidden">
                <div
                    className={cn(
                        `
                            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
                            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
                            [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
                            dark:[--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
                            [background-image:var(--white-gradient),var(--aurora)]
                            dark:[background-image:var(--dark-gradient),var(--aurora)]
                            [background-size:300%,_200%]
                            [background-position:50%_50%,50%_50%]
                            filter blur-[10px] invert dark:invert-0
                            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
                            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
                            after:[background-size:200%,_100%] 
                            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
                            pointer-events-none
                            absolute -inset-[10px] opacity-50 will-change-transform
                            [mask-image:radial-gradient(ellipse_at_100%_0%,black_0%,var(--transparent)_70%)]
                        `,
                        props.showRadialGradient && `[mask-image:radial-gradient(ellipse_at_100%_0%,black_0%,var(--transparent)_70%)]`
                    )}
                />
            </div>
            <div className="relative z-10">
                {props.children}
            </div>
        </div>
    )
}
