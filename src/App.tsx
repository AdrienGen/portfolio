import { createContext, useEffect, useState } from 'react';
import AuroraBackground from './components/aurora-background';
import Cursor from './components/cursor';
import AppBar from './components/app-bar';
import EvervaultBackground from './components/evervault-background';

export interface IColorSchemeContext {
    colorScheme: 'light' | 'dark';
    setColorScheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
}

export const ColorSchemeContext = createContext<IColorSchemeContext | null>(null);

// ---------------------------------------------------------------------------------------------------- //
// ------------------------------------------------ APP ----------------------------------------------- //
// ---------------------------------------------------------------------------------------------------- //

export default function App() {

    const [colorScheme, setColorScheme] = useState<'light' | 'dark'>(getInitialSchemeColor());

    useEffect(() => {
        document.body.classList.add(colorScheme);
        // eslint-disable-next-line
    }, []);


    return (
        <ColorSchemeContext.Provider value={{ colorScheme, setColorScheme }}>
            <EvervaultBackground />
            <AuroraBackground showRadialGradient>
                <Cursor />
                <AppBar />
            </AuroraBackground>
        </ColorSchemeContext.Provider>
    )
}

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
