import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { PlusIcon } from '../Icon';
import { useTranslation } from 'react-i18next';
import { PortfolioImageUploadStyle } from './PortfolioImageUpload.style';

const PortfolioImageUpload = () => {
  const { t } = useTranslation();
  return (
    <View style={PortfolioImageUploadStyle.header}>
      <Text style={PortfolioImageUploadStyle.label}>
        {t('tasker.portfolio')}
      </Text>
      <TouchableOpacity style={PortfolioImageUploadStyle.plusBtn}>
        <PlusIcon width={32} />
      </TouchableOpacity>
    </View>
  );
};

export default PortfolioImageUpload;
