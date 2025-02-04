import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { MdOutlineDarkMode, MdOutlineLightMode, MdVolumeOff, MdVolumeUp } from 'react-icons/md';
import { AppContext, IAppContext } from '../../App';
import BlackLogo from '../../assets/images/black-logo.svg?react';
import WhiteLogo from '../../assets/images/white-logo.svg?react';

// ---------------------------------------------------------------------------------------------------- //
// ---------------------------------------------- APP BAR --------------------------------------------- //
// ---------------------------------------------------------------------------------------------------- //

export default function AppBar() {

    const { colorScheme, musicMuted, setContext } = useContext(AppContext) as IAppContext;
    const { t } = useTranslation();

    const onChangeColorScheme = () => {
        const nextColorScheme = (colorScheme === 'light') ? 'dark' : 'light';
        document.body.classList.forEach(value => document.body.classList.remove(value));
        document.body.classList.add(nextColorScheme);
        localStorage.setItem('colorScheme', nextColorScheme);
        setContext(prevContext => ({ ...prevContext, colorScheme: nextColorScheme }));
    }

    const onChangeMuted = () => {
        localStorage.setItem('musicMuted', musicMuted ? 'false' : 'true');
        setContext(prevContext => ({ ...prevContext, musicMuted: !prevContext.musicMuted }));
    }

    return (
        <header
            role="banner"
            className="header-banner"
        >
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
                        {t('certificates')}
                    </button>
                    <button className="font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100">
                        {t('skills')}
                    </button>
                    <button className="font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100">
                        {t('contact')}
                    </button>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={onChangeColorScheme}
                        className="text-xl text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
                    >
                        {colorScheme === 'dark' ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
                    </button>
                    <button
                        onClick={onChangeMuted}
                        className="text-xl text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
                    >
                        {musicMuted ? <MdVolumeOff /> : <MdVolumeUp />}
                    </button>
                </div>
            </div>
        </header>
    )
}
