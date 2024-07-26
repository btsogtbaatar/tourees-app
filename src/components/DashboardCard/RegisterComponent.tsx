import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { VectorIcon } from '../../assets/svg';
import { colors } from '../../constants/colors';
import { horizontalScale, verticalScale } from '../../utilities/metrics';

interface Props {
  onPress: () => void;
}

const RegisterComponent = (props: Props) => {
  return (
    <LinearGradient
      colors={['#37414B', '#161A1E']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0, 1]}
      style={{
        paddingTop: verticalScale(12),
        paddingBottom: verticalScale(16),
        paddingHorizontal: horizontalScale(16),
        borderRadius: horizontalScale(16),
        flexDirection: 'row',
      }}>
      <View
        style={{
          width: horizontalScale(240),
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 8,
        }}>
        <Text
          style={{
            color: colors.white,
            fontSize: 16,
            fontWeight: '500',
            lineHeight: 24,
            fontFamily: 'Nunito',
          }}>
          Хэрвээ та үйлчилгээ үзүүлэгч бол бидэнтэй нэгдээрэй!
        </Text>
        <TouchableOpacity
          onPress={props.onPress}
          style={{
            height: verticalScale(32),
            paddingHorizontal: horizontalScale(12),
            justifyContent: 'center',
            backgroundColor: colors.white,
            borderRadius: horizontalScale(12),
            gap: 4,
          }}>
          <Text>Бүртгүүлэх</Text>
        </TouchableOpacity>
      </View>
      <View>
        <VectorIcon />
      </View>
    </LinearGradient>
  );
};

export default RegisterComponent;
