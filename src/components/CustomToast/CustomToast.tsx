import { Alert } from 'react-native';

export function notifyMessage(title: string, description: string) {
  Alert.alert(title, description, [
    {
      text: 'Ok',
      onPress: () => console.log('Accepted'),
    },
  ]);
}
