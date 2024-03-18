/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import {
  Calendar as CalendarItem,
  CalendarProps,
  DateData,
  LocaleConfig,
} from 'react-native-calendars';
import { Colors } from '../../../../constants/Colors';
import { calendarTheme } from '../../Dashboard/Pages/Home/Request/UserRequest/UserRequest.style';
import { calendarMnLocale } from '../../../constants/DummyData';
import { verticalScale } from '../../../uitls/metrics';

interface CalendarItemProps extends CalendarProps {
  onSuccess: (value: string) => void;
  initialStartDate?: string;
}

const Calendar = ({
  onSuccess,
  initialStartDate,
  ...rest
}: CalendarItemProps) => {
  const [startDate, setStartDate] = useState<string>('');
  const [datePicked, setDatePicked] = useState<boolean>(false);

  useEffect(() => {
    if (initialStartDate && !datePicked) {
      setStartDate(initialStartDate);
    }
  }, [initialStartDate, datePicked]);

  LocaleConfig.locales['mn'] = calendarMnLocale;
  LocaleConfig.defaultLocale = 'mn';

  const handleSuccess = useCallback(
    (selectedStartDate: string) => {
      setStartDate(selectedStartDate);
      setDatePicked(true);
      onSuccess(selectedStartDate);
    },
    [onSuccess],
  );

  useEffect(() => {
    if (!datePicked && initialStartDate) {
      handleSuccess(initialStartDate);
    }
  }, [datePicked, initialStartDate, handleSuccess]);

  const onDayPress = useCallback(
    (day: DateData) => {
      const selectedStartDate = day.dateString;
      handleSuccess(selectedStartDate);
    },
    [handleSuccess],
  );

  return (
    <View
      style={{
        borderRadius: 16,
        borderWidth: 1,
        padding: 16,
        borderColor: Colors.borderColor,
        marginVertical: verticalScale(16),
      }}>
      <CalendarItem
        firstDay={1}
        hideExtraDays={true}
        initialDate={startDate || initialStartDate}
        onDayPress={(day: DateData) => {
          onDayPress(day);
        }}
        onDayLongPress={(day: DateData) => {
          console.log(day, 'long Day');
        }}
        markedDates={{
          [startDate]: {
            selected: true,
            selectedColor: Colors.primaryColor,
            selectedTextColor: Colors.textWhite,
            disableTouchEvent: true,
          },
        }}
        theme={calendarTheme}
      />
    </View>
  );
};

export default Calendar;
