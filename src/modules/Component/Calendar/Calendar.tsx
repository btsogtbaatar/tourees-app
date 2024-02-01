import React, { useState } from 'react';
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
  onSuccess: (startDate: string) => void;
  initialStartDate: string;
}

const Calendar = ({
  onSuccess,
  initialStartDate,
  ...rest
}: CalendarItemProps) => {
  const [startDate, setStartDate] = useState<string>(initialStartDate);
  console.log(startDate, 'startDate');
  LocaleConfig.locales['mn'] = calendarMnLocale;
  LocaleConfig.defaultLocale = 'mn';

  const onDayPress = (day: DateData) => {
    setStartDate(day.dateString);
  };
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
        initialDate={startDate}
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
