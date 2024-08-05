import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme';
import { horizontalScale, verticalScale } from '../../utilities';
import WeekendList from '../WeekendList/WeekendList';
import { useTranslation } from 'react-i18next';
import FooterButton from '../FooterButton/FooterButton';

interface TimeDownModalProps {
  onClick: () => void;
}

const TimeDownModal = ({ onClick }: TimeDownModalProps) => {
  const { t } = useTranslation();
  const datas = [
    {
      values: t('profile.l_morning') + ' 8 - 11am',
      timeValue: '8 - 11am',
      onPress: () => {
        console.log('test');
      },
      isCheck: false,
    },
    {
      values: t('profile.l_afternoon') + ' 12 - 15pm',
      onPress: () => {
        console.log('test');
      },
      isCheck: true,
    },
    {
      values: t('profile.l_evening') + ' 16 - 22pm',
      onPress: () => {
        console.log('test');
      },
      isCheck: false,
    },
    {
      values: t('profile.l_not_working'),
      onPress: () => {
        console.log('test');
      },
      isCheck: true,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.headerStyle}>Та ажиллах цагаа сонгоно уу?</Text>
      <WeekendList items={datas} />
      <View style={styles.footerStyle}>
        <FooterButton
          onPress={onClick}
          showBackButton={true}
          onBackPress={onClick}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderTopRightRadius: horizontalScale(24),
    borderTopLeftRadius: horizontalScale(24),
    paddingHorizontal: horizontalScale(24),
    paddingTop: verticalScale(24),
  },
  headerStyle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: verticalScale(10),
  },
  footerStyle: { marginTop: verticalScale(20) },
});

export default TimeDownModal;
