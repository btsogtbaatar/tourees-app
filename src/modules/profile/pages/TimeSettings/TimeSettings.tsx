import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import WeekendList from '../../../../components/WeekendList/WeekendList';
import { horizontalScale, verticalScale } from '../../../../utilities';

const TimeSettings = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.paddingContainer}>
      <Text style={styles.headerStyle}>{t('profile.l_weekend')}</Text>
      <WeekendList />
    </View>
  );
};

const styles = StyleSheet.create({
  paddingContainer: {
    padding: horizontalScale(16),
  },
  headerStyle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: verticalScale(10),
  },
});

export default TimeSettings;
