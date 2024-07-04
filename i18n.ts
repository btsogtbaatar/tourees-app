import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationMn from './src/i18n/mn';
import translationEn from './src/i18n/en';
import translationChn from './src/i18n/chn';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    mn: {
      translation: translationMn,
    },
    en: {
      translation: translationEn,
    },
    chn: {
      translation: translationChn,
    },
  },
  lng: 'mn',
  fallbackLng: 'mn',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
