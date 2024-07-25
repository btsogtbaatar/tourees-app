/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  Calendar as CalendarItem,
  CalendarProps,
  DateData,
  LocaleConfig,
} from 'react-native-calendars';
import { calendarMnLocale } from '../../constants/calendarMnLocale';
import { colors } from '../../constants/colors';
import { calendarTheme } from '../../modules/Request/page/UserRequest/UserRequest.style';
import { verticalScale } from '../../utilities';

interface CalendarItemProps extends CalendarProps {
  onSuccess: (value: string) => void;
  initialStartDate?: string;
}

const Calendar = ({ onSuccess, initialStartDate }: CalendarItemProps) => {
  const [startDate, setStartDate] = useState<string>('');
  const [datePicked, setDatePicked] = useState<boolean>(false);

  useEffect(() => {
    if (initialStartDate && !datePicked) {
      setStartDate(initialStartDate);
    }
  }, [initialStartDate, datePicked]);

  LocaleConfig.locales.mn = calendarMnLocale;
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
        borderColor: colors.borderColor,
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
            selectedColor: colors.primaryColor,
            selectedTextColor: colors.textWhite,
            disableTouchEvent: true,
          },
        }}
        theme={calendarTheme}
      />
    </View>
  );
};

export default Calendar;
