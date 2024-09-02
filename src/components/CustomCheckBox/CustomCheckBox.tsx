import React from 'react';
import { TouchableOpacityProps, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { verticalScale } from '../../utilities';
import { CheckIcon } from '../Icon';
import { colors } from '../../theme';
import CustomCheckBoxStyle from './CustomCheckBox.style';

interface CustomCheckBox extends TouchableOpacityProps {
  value: boolean;
  onPress: () => void;
}

export default function CustomCheckBox(props: CustomCheckBox) {
  return (
    <View style={CustomCheckBoxStyle.container}>
      <TouchableOpacity
        style={CustomCheckBoxStyle.button}
        onPress={() => {
          props.onPress();
        }}>
        {props.value ? (
          <View style={CustomCheckBoxStyle.active}>
            <CheckIcon
              width={verticalScale(16)}
              height={verticalScale(16)}
              color={colors.white}
            />
          </View>
        ) : (
          <View style={CustomCheckBoxStyle.inActive} />
        )}
      </TouchableOpacity>
      {props?.children}
    </View>
  );
}
