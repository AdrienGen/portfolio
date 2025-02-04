import { createRoot } from 'react-dom/client';
import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';

// Translation Files
import frTrans from './assets/translations/fr.translation.json';
import enTrans from './assets/translations/en.translation.json';

// Main Component
import App from './App.tsx';

// Main CSS
import './index.css';

/* * *
* i18next
*/

i18next.use(initReactI18next).init({
    resources: {
        fr: { translation: frTrans },
        en: { translation: enTrans },
    },
    lng: "en",
    fallbackLng: "en",
});

// ---------------------------------------------------------------------------------------------------- //
// ------------------------------------------------ ROOT ---------------------------------------------- //
// ---------------------------------------------------------------------------------------------------- //

createRoot(document.getElementById('root')!).render(<App />);
