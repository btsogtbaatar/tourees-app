import React from 'react';
import { useState } from 'react';
import { TextInput, View } from 'react-native';
import { colors } from '../../theme';
import { horizontalScale } from '../../utilities';

interface BoxDigitProps {
  index: number;
  onFocus: (index: number) => void;
  onTextChange: (index: number, value: string) => void;
  refrences: React.MutableRefObject<React.RefObject<TextInput>[]>;
}

const BoxDigit = ({
  index,
  onFocus,
  onTextChange,
  refrences,
}: BoxDigitProps) => {
  refrences.current[index] = React.createRef();
  const [focus, setFocus] = useState<boolean>(false);

  return (
    <View
      key={index}
      style={{
        borderWidth: 1,
        borderColor: focus ? colors.optFocusBorder : colors.otpBorder,
        backgroundColor: colors.white,
        borderRadius: horizontalScale(16),
        alignItems: 'center',
        justifyContent: 'center',
        width: horizontalScale(64),
        height: horizontalScale(64),
      }}>
      <TextInput
        selectionColor={colors.primary500}
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 24,
          fontFamily: 'Nunito',
        }}
        onFocus={() => {
          onFocus(index);
          setFocus(true);
        }}
        onBlur={() => setFocus(false)}
        onChangeText={(value: string) => {
          onTextChange(index, value);
        }}
        maxLength={1}
        keyboardType="phone-pad"
        ref={refrences.current[index]}
      />
    </View>
  );
};
export default BoxDigit;
