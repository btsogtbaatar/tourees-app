import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { AuthStackParamList } from '../../../../../types/AuthStackParamList';
import UsernameDropdown from '../../../../Component/Dropdown/UsernameDropdown';
import FooterButton from '../../../../Component/FooterButton/FooterButton';
import Steps from '../../../../Component/Step/Steps';
import {
  RegisterModule,
  UsernameResponse,
} from '../../../entities/register.mode';
import styles from './RegisterUsername.style';
import { authService } from '../../../../../api/services/auth/auth.service';

interface Props {
  route: {
    params: {
      values?: UsernameResponse[];
      registerType: RegisterModule.RegisterType;
    };
  };
  navigation: NavigationProp<AuthStackParamList>;
}

function RegisterUsername({ route, navigation }: Props) {
  const [checkUsername, setCheckUsername] = useState<string>('');
  const { values, registerType } = route?.params;

  const sendOpt = () => {
    const data = { ...registerType, count: 4 };
    authService.sendOtp(data).then(res => {
      console.log(res);
      navigation.navigate('SignUpOtp', {signUp: data});
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Steps groupSteps={3} steps={2} />
          <View style={styles.subContainer}>
            <FlatList
              data={values}
              renderItem={({ item }) => {
                return (
                  <UsernameDropdown
                    check={checkUsername}
                    item={item.username}
                    onPress={() => {
                      setCheckUsername(item.username);
                    }}
                    checked={item.username === checkUsername}
                  />
                );
              }}
            />
          </View>
        </View>
      </View>
      <FooterButton
        back={true}
        extra={{ flexDirection: 'row' }}
        onPress={() => {
          sendOpt();
        }}
        btnDisabled={!checkUsername}
      />
    </View>
  );
}

export default RegisterUsername;
