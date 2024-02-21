import React from 'react';
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { horizontalScale, verticalScale } from '../../../uitls/metrics';
import { Colors } from '../../../../constants/Colors';

interface LinearButtonProps {
  extra?: StyleProp<ViewStyle>;
  textExtra?: StyleProp<TextStyle>;
  onClick: () => void;
  buttonText?: string;
}

const LinearButton = ({
  extra,
  textExtra,
  onClick,
  buttonText,
}: LinearButtonProps) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0, 1]}
      colors={['#FF9646', '#FA6432']}
      style={[
        extra,
        {
          borderRadius: horizontalScale(12),
        },
      ]}>
      <TouchableOpacity
        onPress={onClick}
        style={[
          {
            paddingHorizontal: horizontalScale(12),
            height: verticalScale(40),
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          },
        ]}>
        <Text
          style={[
            textExtra,
            {
              color: Colors.textWhite,
              fontWeight: '700',
              lineHeight: 18,
            },
          ]}>
          {buttonText ? buttonText : 'Нэвтрэх'}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default LinearButton;
