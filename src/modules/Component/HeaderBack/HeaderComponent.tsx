import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { Colors } from '../../../../constants/Colors';
import { LogoIcon } from '../../../assets/svg';

interface HeaderProps {
  isAuth?: boolean;
  index: number;
  title: string;
}

const HeaderComponent = (props: HeaderProps) => {
  const { index, title } = props;
  const { t } = useTranslation();
  return (
    <View>
      {index == 0 ? (
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            width: '100%',
          }}>
          <LogoIcon />
        </View>
      ) : (
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            lineHeight: 30,
            color: Colors.textHeader,
          }}>
          {t(title)}
        </Text>
      )}
    </View>
  );
};

export default HeaderComponent;
