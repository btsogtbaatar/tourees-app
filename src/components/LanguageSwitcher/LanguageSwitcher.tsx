import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useLanguage from '../../hooks/useLanguage';
import { GlobalIcon } from '../Icon';
import { LanguageSwitcherStyle } from './LanguageSwitcher.style';

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <TouchableOpacity onPress={() => toggleLanguage()}>
      <View style={LanguageSwitcherStyle.container}>
        <GlobalIcon />
        <Text style={LanguageSwitcherStyle.label}>{language}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default LanguageSwitcher;
