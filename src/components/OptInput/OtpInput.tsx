import React, { useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { colors } from '../../constants/colors';
import { horizontalScale } from '../../utilities/metrics';

interface OtpProps {
  codeLength: 4 | 6;
  minWidth?: number;
  onChange: (value: string[]) => void;
}

const OtpInput = (props: OtpProps) => {
  const [values, setValues] = useState<string[]>([]);
  const { codeLength, onChange } = props;
  const codeArray = new Array(codeLength).fill('-');

  useEffect(() => {
    onChange && onChange(values);
  }, [values]);

  useEffect(() => {
    refArr.current[0].current?.focus();
  }, []);

  const refArr = useRef<React.RefObject<TextInput>[]>([]);

  const BoxDigit = (_: any, index: number) => {
    refArr.current[index] = React.createRef();
    const [focus, setFocus] = useState<boolean>(false);

    return (
      <View
        key={index}
        style={{
          borderWidth: 1,
          borderColor: focus ? colors.optFocusBorder : colors.otpBorder,
          backgroundColor: colors.textWhite,
          borderRadius: horizontalScale(16),
          alignItems: 'center',
          justifyContent: 'center',
          width: horizontalScale(64),
          height: horizontalScale(64),
        }}>
        <TextInput
          selectionColor={colors.primaryColor}
          style={{
            textAlign: 'center',
            fontWeight: '700',
            fontSize: 24,
            fontFamily: 'Nunito',
          }}
          onFocus={() => {
            if (index < codeLength) {
              refArr.current[codeLength]?.current?.focus();
            }
            setFocus(true);
          }}
          onBlur={() => setFocus(false)}
          onChangeText={(value: string) => {
            value = value.replace(/[^\d]/g, '');
            setValues(state => {
              state[index] = value;
              return [...state];
            });
            if (value) {
              if (index + 1 != codeLength) {
                refArr.current[index + 1].current?.focus();
              }
            } else {
              if (index != 0) {
                refArr.current[index - 1].current?.focus();
              }
            }
          }}
          maxLength={1}
          keyboardType="phone-pad"
          ref={refArr.current[index]}
        />
      </View>
    );
  };

  return <>{codeArray.map(BoxDigit)}</>;
};

export default OtpInput;