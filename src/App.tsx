import { createContext, useEffect, useState } from 'react';
import AuroraBackground from './components/aurora-background';
import Cursor from './components/cursor';
import AppBar from './components/app-bar';
import EvervaultBackground from './components/evervault-background';
import FridayVibesMusic from './assets/sounds/friday_vibes.mp3';

export interface IAppContext {
    colorScheme: 'light' | 'dark';
    musicMuted: boolean;
    setContext: React.Dispatch<React.SetStateAction<{ colorScheme: 'light' | 'dark'; musicMuted: boolean; }>>;
}

export const AppContext = createContext<IAppContext | null>(null);

// ---------------------------------------------------------------------------------------------------- //
// ------------------------------------------------ APP ----------------------------------------------- //
// ---------------------------------------------------------------------------------------------------- //

export default function App() {

    const [context, setContext] = useState<{ colorScheme: 'light' | 'dark'; musicMuted: boolean; }>({
        colorScheme: getInitialSchemeColor(),
        musicMuted: getInitialMusicMuted(),
    });

    useEffect(() => {
        document.body.classList.add(context.colorScheme);
        // eslint-disable-next-line
    }, []);

    return (
        <AppContext.Provider
            value={{
                musicMuted: context.musicMuted,
                colorScheme: context.colorScheme,
                setContext,
            }}
        >
            <EvervaultBackground />
            <AuroraBackground showRadialGradient>
                <Cursor />
                <AppBar />
            </AuroraBackground>
            <audio
                id="background-music"
                src={FridayVibesMusic}
                muted={context.musicMuted}
                loop
            />
        </AppContext.Provider>
    )
}

// ---------------------------------------------------------------------------------------------------- //
// ---------------------------------------- INITIAL SCHEME COLOR -------------------------------------- //
// ---------------------------------------------------------------------------------------------------- //

function getInitialSchemeColor() {
    
    const storageColorScheme = localStorage.getItem('colorScheme');

    if (storageColorScheme === 'light' || storageColorScheme === 'dark') {
        return storageColorScheme;
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

// ---------------------------------------------------------------------------------------------------- //
// ----------------------------------------- INITIAL MUSIC MUTED -------------------------------------- //
// ---------------------------------------------------------------------------------------------------- //

function getInitialMusicMuted() {

    const storageMusicMuted = localStorage.getItem('musicMuted');

    return storageMusicMuted === 'true';
}
