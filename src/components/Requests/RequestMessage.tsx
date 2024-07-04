import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LogoMini from '../../assets/svg/logo/LogoMini';
import styles from './RequestsCard.style';
import PhoneIcon from '../../assets/svg/icons/PhoneIcon';
import LoginButton from '../LoginButton/LoginButton';
import RatingList from '../Rating/RatingList';

interface RequestMessageProps {
  time: string;
  newRequest: boolean;
}

const RequestMessage = ({ time, newRequest }: RequestMessageProps) => {
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
        <Text style={styles.messageTimeStyle}>{time}</Text>
      </View>
      <Text style={styles.messageStyle}>
        {newRequest
          ? t('request.requestNewMessage')
          : t('request.requestOperatorMessage')}
      </Text>
      {newRequest ? (
        <TouchableOpacity style={styles.operatorBtn}>
          <PhoneIcon />
          <Text style={[styles.operatorTxt, styles.logoText]}>
            {t('request.operatorCall')}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.operatorContainer}>
          <View style={styles.profileContainer}>
            <View style={[styles.flexRow, styles.alignCenter]}>
              <Image
                source={require('../../assets/image/ProfilePicture.png')}
              />
              <Text style={styles.profile}>{time}</Text>
            </View>
            <LoginButton
              title={t('profile.seeProfile')}
              onClick={() => console.log('test')}
            />
          </View>
          <RatingList rating={2.4} />
        </View>
      )}
    </View>
  );
};

export default RequestMessage;
