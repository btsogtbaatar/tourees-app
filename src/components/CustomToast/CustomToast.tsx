import { Alert } from 'react-native';

export function notifyMessage(
  title: string,
  description: string,
  onPress?: () => void,
) {
  Alert.alert(title, description, [
    {
      text: 'Ok',
      onPress: onPress,
    },
  ]);
}
