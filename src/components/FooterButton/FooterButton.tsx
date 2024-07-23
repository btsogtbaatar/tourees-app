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
import FooterBack from '../../assets/svg/FooterBack';
import { colors } from '../../constants/colors';
import styles from './FooterButton.style';

interface PropsButton {
  extra?: StyleProp<ViewStyle>;
  btnExtra?: StyleProp<ViewStyle>;
  textExtra?: StyleProp<TextStyle>;
  text?: string;
  onPress: () => void;
  back: boolean;
  btnDisabled?: boolean;
  backColor?: boolean;
  onBackPress?: () => void;
}

function FooterButton(props: PropsButton) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.container,
        props.extra,
        {
          backgroundColor: props.backColor
            ? colors.transparent
            : colors.textWhite,
        },
      ]}>
      {props.back && (
        <View style={{ backgroundColor: colors.textWhite, borderRadius: 12 }}>
          <TouchableOpacity
            onPress={props.onBackPress ?? navigation.goBack}
            style={styles.icon}>
            <FooterBack color="#21272D" />
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        onPress={props.onPress}
        disabled={props.btnDisabled}
        style={[styles.btn, props.btnDisabled && styles.disabled]}>
        <Text style={[props.textExtra, styles.btnTextStyle]}>
          {props.text ? props.text : t('b_continue')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default FooterButton;
