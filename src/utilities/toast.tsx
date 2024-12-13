import { Alert } from 'react-native';
import i18n from '../../i18n';

export function toast(
  title: string,
  description: string,
  onPress?: () => void,
) {
  Alert.alert(title, description, [
    {
      text: i18n.t('l_dismissLabel'),
      onPress: onPress,
    },
  ]);
}

export function toastError(description: string, onPress?: () => void) {
  Alert.alert(i18n.t('error'), description, [
    {
      text: i18n.t('l_dismissLabel'),
      onPress: onPress,
    },
  ]);
}


export function toastSuccess(description: string, onPress?: () => void) {
  Alert.alert(i18n.t('successful'), description, [
    {
      text: i18n.t('l_dismissLabel'),
      onPress: onPress,
    },
  ]);
}
