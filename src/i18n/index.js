import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import all translation files
import enTranslation from './translations/en.json';
import ruTranslation from './translations/ru.json';
import kzTranslation from './translations/kz.json';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3', // For React Native compatibility
    resources: {
      en: {
        translation: enTranslation
      },
      ru: {
        translation: ruTranslation
      },
      kz: {
        translation: kzTranslation
      }
    },
    lng: 'ru', 
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;