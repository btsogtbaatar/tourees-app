import React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme/colors';
import { horizontalScale, verticalScale } from '../../utilities';

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
              color: colors.white,
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
