import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View, Switch } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useSelector } from 'react-redux';
import { SharedModel } from '../../modules/Shared/entities/shared.model';
import { selectLanguage } from '../../modules/Shared/slice/preferenceSlice';
import { Typography } from '../../theme';
import {
  getToday,
  getTomorrow,
  isSelectedDate,
  isTodayActive,
  isTomorrowActive,
} from '../../utilities/date';
import CalendarStyle from './Calendar.style';
import CustomSelectionButton from '../CustomButton/CustomSelectionButton';
import { colors } from '../../theme/colors';

interface TimeRange {
  label: string;
  startHour: number;
  endHour: number;
  icon: React.ReactNode;
}

interface CalendarItemProps {
  onSuccess: (value: SharedModel.TimeRange) => void;
  timeRanges: TimeRange[];
  locale?: string;
  showTodayButton?: boolean;
  showTomorrowButton?: boolean;
  showRangeButtons?: boolean;
  showdatePick?: boolean;
  showToggleBtn?: boolean;
  onToggleFlexible?: (isFlexible: boolean) => void;
}

const Calendar = ({
  onSuccess,
  timeRanges,
  locale = 'en',
  showTodayButton = true,
  showTomorrowButton = true,
  showRangeButtons = true,
  showdatePick = true,
  showToggleBtn = true,
  onToggleFlexible = () => {},
}: CalendarItemProps) => {
  const [activeTime, setActiveTime] = useState<TimeRange>(timeRanges[0]);
  const { t } = useTranslation();
  const language = useSelector(selectLanguage) || locale;
  const [activeDate, setActiveDate] = useState<Date>(getToday());
  const [modal, setModal] = useState<boolean>(false);
  const [isFlexible, setIsFlexible] = useState<boolean>(false);

  useEffect(() => {
    const date = moment(activeDate);
    date.utcOffset(0, true);
    const result = {
      start: date.clone().startOf('day').hour(activeTime.startHour),
      end: date.clone().startOf('day').hour(activeTime.endHour),
    };
    onSuccess({ start: result.start.toDate(), end: result.end.toDate() });
  }, [activeDate, activeTime]);

  const updateTime = (updatedTime: TimeRange) => {
    if (activeTime === updatedTime) {
      return;
    }
    setActiveTime(updatedTime);
  };

  const getTranslatedDate = (currentDate: Date) => {
    if (isTodayActive(currentDate)) {
      return t('calendar.today');
    }
    if (isTomorrowActive(currentDate)) {
      return t('calendar.tomorrow');
    }
    return currentDate.toLocaleDateString(language);
  };

  return (
    <View style={CalendarStyle.container}>
      {showToggleBtn && (
        <View style={CalendarStyle.toggleSection}>
          <Text style={Typography.textSmall}>{t('calendar.flexible')}</Text>
          <Switch
           value={isFlexible}
           onValueChange={() => {
             setIsFlexible(prev => {
               const newFlexibleState = !prev;
               onToggleFlexible(newFlexibleState);
               return newFlexibleState;
             });
           }}
           trackColor={{
             false: colors.gray100,
             true: colors.borderPrimaryColor,
           }}


            
          />
        </View>
      )}
      {showdatePick && !isFlexible && (
        <DatePicker
          date={activeDate}
          mode="date"
          modal
          title={t('calendar.title')}
          confirmText={t('calendar.selectDate')}
          cancelText={t('calendar.cancel')}
          locale={language}
          open={modal}
          onConfirm={e => {
            setActiveDate(e);
            setModal(false);
          }}
          onCancel={() => {
            setModal(false);
          }}
        />
      )}

      <View style={CalendarStyle.dateSection}>
        {showTodayButton && !isFlexible && (
          <CustomSelectionButton
            style={CalendarStyle.dateButtons}
            active={isTodayActive(activeDate)}
            onPress={() => setActiveDate(getToday())}>
            <Text style={Typography.textSmall}>{t('calendar.today')}</Text>
          </CustomSelectionButton>
        )}
        {showTomorrowButton && !isFlexible && (
          <CustomSelectionButton
            style={CalendarStyle.dateButtons}
            active={isTomorrowActive(activeDate)}
            onPress={() => setActiveDate(getTomorrow())}>
            <Text style={Typography.textSmall}>{t('calendar.tomorrow')}</Text>
          </CustomSelectionButton>
        )}
        {showdatePick && !isFlexible && (
          <CustomSelectionButton
            style={CalendarStyle.dateButtons}
            active={isSelectedDate(activeDate)}
            onPress={() => setModal(true)}>
            <Text style={Typography.textSmall}>{t('calendar.selectDate')}</Text>
          </CustomSelectionButton>
        )}
      </View>
      {!isFlexible && (
        <View style={CalendarStyle.infoSection}>
          <Text style={Typography.textSmall}>
            {getTranslatedDate(activeDate)} | {activeTime.label}
          </Text>
        </View>
      )}
      {showRangeButtons && !isFlexible && (
        <View style={CalendarStyle.timeSection}>
          <View style={CalendarStyle.timeSectionRow}>
            {timeRanges.slice(0, 2).map((range, index) => (
              <CustomSelectionButton
                key={index}
                style={CalendarStyle.timeButton}
                active={range === activeTime}
                onPress={() => updateTime(range)}>
                {range.icon}
                <Text style={Typography.textSmall}>{range.label}</Text>
                <Text style={Typography.textSmall}>
                  {`${range.startHour}:00 - ${range.endHour}:00`}
                </Text>
              </CustomSelectionButton>
            ))}
          </View>
          <View style={CalendarStyle.timeSectionRow}>
            {timeRanges.slice(2).map((range, index) => (
              <CustomSelectionButton
                key={index}
                style={CalendarStyle.timeButton}
                active={range === activeTime}
                onPress={() => updateTime(range)}>
                {range.icon}
                <Text style={Typography.textSmall}>{range.label}</Text>
                <Text style={Typography.textSmall}>
                  {`${range.startHour}:00 - ${range.endHour}:00`}
                </Text>
              </CustomSelectionButton>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default Calendar;
