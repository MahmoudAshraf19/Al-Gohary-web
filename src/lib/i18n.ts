import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '../locales/en/translation.json';
import arTranslation from '../locales/ar/translation.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  ar: {
    translation: arTranslation,
  },
};

const savedLng = typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : null;
const defaultLng = savedLng || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLng, 
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
  });

if (typeof window !== 'undefined') {
  document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = i18n.language;
}

i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
    localStorage.setItem('i18nextLng', lng);
  }
});

export default i18n;
