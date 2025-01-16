import { useContext, useEffect, useState } from 'react';
import { MdDarkMode, MdLightMode, MdVolumeOff, MdVolumeUp } from 'react-icons/md';
import BlackLogo from '../../assets/images/black-logo.svg?react';
import WhiteLogo from '../../assets/images/white-logo.svg?react';
import FridayVibesSound from '../../assets/sounds/friday_vibes.mp3';
import { ColorSchemeContext, IColorSchemeContext } from '../../App';

// ---------------------------------------------------------------------------------------------------- //
// ---------------------------------------------- APP BAR --------------------------------------------- //
// ---------------------------------------------------------------------------------------------------- //

export default function AppBar() {

    const { colorScheme, setColorScheme } = useContext(ColorSchemeContext) as IColorSchemeContext;
    const [muted, setMuted] = useState(localStorage.getItem('muted') === 'true');

    const onChangeColorScheme = () => {
        const nextColorScheme = (colorScheme === 'light') ? 'dark' : 'light';
        document.body.classList.forEach(value => document.body.classList.remove(value));
        document.body.classList.add(nextColorScheme);
        localStorage.setItem('colorScheme', nextColorScheme);
        setColorScheme(nextColorScheme);
    }

    const onChangeMuted = () => {
        localStorage.setItem('muted', muted ? 'false' : 'true');
        setMuted(value => !value);
    }

    useEffect(() => {
        const audio = document.querySelector('audio') as HTMLAudioElement;
        audio.play();
    }, []);

    return (
        <header role="banner" className="header-banner">
            <div className="flex items-center justify-between gap-8 max-w-screen-xl p-4 m-auto">
                {colorScheme === 'dark' ? (
                    <WhiteLogo className="w-8 h-8 rounded" />
                ) : (
                    <BlackLogo className="w-8 h-8 rounded" />
                )}
                <div className="flex-1 header-fullname mt-1 text-zinc-600 dark:text-zinc-300">
                    adrien.gendronneau
                </div>
                <div className="flex gap-8">
                    <button className="font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100">
                        Projets
                    </button>
                    <button className="font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100">
                        Contact
                    </button>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={onChangeColorScheme}
                        className="text-xl text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
                    >
                        {colorScheme === 'dark' ? <MdLightMode /> : <MdDarkMode />}
                    </button>
                    <button
                        onClick={onChangeMuted}
                        className="text-xl text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
                    >
                        {muted ? <MdVolumeOff /> : <MdVolumeUp />}
                    </button>
                    <audio
                        src={FridayVibesSound}
                        muted={muted}
                        loop
                    />
                </div>
            </div>
        </header>
    )
}
