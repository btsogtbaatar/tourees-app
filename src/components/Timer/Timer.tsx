import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { colors } from '../../theme/colors';

interface TimerProps {
  counter: number;
}

const Timer: React.FC<TimerProps> = props => {
  const [otpTimer, setOtpTimer] = useState(0);
  const { counter } = props;

  useEffect(() => {
    setOtpTimer(counter);
    return () => setOtpTimer(0);
  }, [counter]);

  const padDuration = (count: number) => {
    return ('0' + count).slice(-2);
  };

  return (
    <Text style={{ color: colors.primary500, fontWeight: '700' }}>
      {padDuration(Math.floor(otpTimer / 60))} : {padDuration(otpTimer % 60)}
    </Text>
  );
};

export default Timer;
