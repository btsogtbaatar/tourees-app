import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text } from 'react-native';
import useTimer from '../../hooks/useTimer';
import { FontWeight, getFontWeight, Typography } from '../../theme';
import TimerStyle from './Timer.style';

interface TimerProps {
  startFrom: number;
  restartFrom: number;
  onResend: () => void;
}

const Timer: React.FC<TimerProps> = ({ startFrom, restartFrom, onResend }) => {
  const [otpTimer, setOtpTimer] = useState(startFrom);
  const [disabled, setDisabled] = useState<boolean>(true);
  const { t } = useTranslation();

  const resend = () => {
    setDisabled(true);
    setOtpTimer(restartFrom);
    onResend();
  };
  useTimer(
    (timer, disableResend) => {
      setOtpTimer(timer);
      if (disableResend) {
        setDisabled(false);
      }
    },
    () => {
      setDisabled(false);
    },
    otpTimer,
  );

  const padDuration = (count: number) => {
    return ('0' + count).slice(-2);
  };

  if (disabled) {
    return (
      <Text
        style={[
          Typography.textSmall,
          getFontWeight(FontWeight.bold),
          TimerStyle.highlight,
        ]}>
        {padDuration(Math.floor(otpTimer / 60))}:{padDuration(otpTimer % 60)}
      </Text>
    );
  }

  return (
    <Pressable onPress={() => resend()}>
      <Text
        style={[
          Typography.textSmall,
          getFontWeight(FontWeight.bold),
          TimerStyle.highlight,
        ]}>
        {t('otp.resend')}
      </Text>
    </Pressable>
  );
};

export default Timer;
