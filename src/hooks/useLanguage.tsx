import { useSelector } from 'react-redux';
import i18n from '../../i18n';
import { useAppDispatch } from '../context/app/store';
import {
  changeLanguage,
  selectLanguage,
} from '../modules/Shared/slice/preferenceSlice';

const useLanguage = () => {
  const language = useSelector(selectLanguage);
  const dispatch = useAppDispatch();

  const toggleLanguage = () => {
    let selectedLanguage = language === 'mn' ? 'en' : 'mn';
    i18n.changeLanguage(selectedLanguage).then(() => {
      dispatch(changeLanguage(selectedLanguage));
    });
  };

  return { language, toggleLanguage };
};

export default useLanguage;
