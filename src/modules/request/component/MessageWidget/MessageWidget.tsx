import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './MessageWidgetStyle';
import { LogoMini } from '../../../../components/Icon';
import { TaskModel } from '../../entities/request.model';
import CustomImage from '../../../../components/CustomImage/CustomImage';
import { horizontalScale, verticalScale } from '../../../../utilities';
import { CustomButtonStyle } from '../../../../components/CustomButton/CustomButton.style';
import { colors, Typography } from '../../../../theme';
import LinearButton from '../../../../components/LoginButton/LinearButton';

interface RequestMessageProps {
  user: TaskModel.User;
  onClick: () => void;
}

const MessageWidget = ({ user, onClick }: RequestMessageProps) => {
  const { t } = useTranslation();
  return (
    <View style={styles.messageContainer}>
      <View style={styles.messageHeaderContainer}>
        <View style={styles.logoContainer}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={[0, 1]}
            colors={['#FF9646', '#FA6432']}
            style={styles.messageLogo}>
            <LogoMini height={10} width={10} />
          </LinearGradient>
          <Text style={styles.logoText}>{t('request.logoTitle')}</Text>
        </View>
      </View>
      <Text style={styles.messageStyle}>{t('request.requestUserProfile')}</Text>
      <View style={styles.operatorContainer}>
        <View style={styles.profileContainer}>
          <View style={[styles.flexRow, styles.alignCenter]}>
            <CustomImage
              style={{ borderRadius: verticalScale(25) }}
              width={verticalScale(25)}
              height={verticalScale(25)}
              source={{ uri: user.profile.url }}
            />
            <Text style={styles.profile}>
              {user.firstName} {user.lastName}
            </Text>
            <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
              <LinearButton
                buttonText={t('request.requestViewProfile')}
                textExtra={Typography.textSmall}
                buttonExtra={{ height: verticalScale(25) }}
                onClick={onClick}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MessageWidget;
