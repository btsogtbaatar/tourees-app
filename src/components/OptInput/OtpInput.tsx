import React, { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import BoxDigit from './BoxDigit';

interface OtpProps {
  codeLength: 4 | 6;
  minWidth?: number;
  onChange: (value: string[]) => void;
}

const OtpInputs = (props: OtpProps) => {
  const [values, setValues] = useState<string[]>([]);
  const { codeLength, onChange } = props;
  const codeArray = new Array(codeLength).fill('-');
  const refArr = useRef<React.RefObject<TextInput>[]>([]);
  console.log('-----------------------');
  console.log(refArr.current.length);
  console.log('-----------------------');
  useEffect(() => {
    onChange && onChange(values);
  }, [values]);

  useEffect(() => {
    refArr.current[0].current?.focus();
  }, []);

  const onFocus = (index: number) => {
    if (index < codeLength) {
      refArr.current[index]?.current?.focus();
    }
  };
  const onTextChange = (index: number, value: string) => {
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
  };

  return (
    <>
      {codeArray.map((value, index) => {
        return (
          <BoxDigit
            key={index}
            index={index}
            onFocus={onFocus}
            onTextChange={onTextChange}
            refrences={refArr}
          />
        );
      })}
    </>
  );
};

export default OtpInputs;
