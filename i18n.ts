import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import translationMn from './i18n/mn';
import translationEn from './i18n/en';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    mn: {
        translation: translationMn
    },
    en: {
        translation: translationEn
    }
  },
  lng: 'mn',
  fallbackLng: 'mn',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
