import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '../../theme/colors';
import { FooterBack } from '../Icon';
import FooterButtonStyle from './FooterButton.style';

interface FooterButtonPropsButton {
  style?: {
    container?: StyleProp<ViewStyle>;
    button?: StyleProp<ViewStyle>;
    text?: StyleProp<TextStyle>;
  };
  text?: string;
  onPress: () => void;
  showBackButton?: boolean;
  disabled?: boolean;
  onBackPress?: () => void;
}

function FooterButton(props: Readonly<FooterButtonPropsButton>) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <View style={[FooterButtonStyle.container, props.style?.container]}>
      {props.showBackButton === true && (
        <View style={FooterButtonStyle.backButton}>
          <TouchableOpacity
            onPress={props.onBackPress ?? navigation.goBack}
            style={FooterButtonStyle.icon}>
            <FooterBack color={colors.gray700} />
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        onPress={props.onPress}
        disabled={props.disabled}
        style={[
          FooterButtonStyle.btn,
          props.disabled && FooterButtonStyle.disabled,
          props.style?.button,
        ]}>
        <Text style={[FooterButtonStyle.btnTextStyle, props.style?.text]}>
          {props.text ? props.text : t('b_continue')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default FooterButton;
