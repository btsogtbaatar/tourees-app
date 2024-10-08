import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
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
import { MoonIcon, SunIcon, SunRiseIcon, SunSetIcon } from '../Icon';
import CalendarStyle from './Calendar.style';
import CalendarButton from './CalendarButton';
import CustomSelectionButton from '../CustomButton/CustomSelectionButton';

interface CalendarItemProps {
  onSuccess: (value: SharedModel.TimeRange) => void;
}
enum TimeChoices {
  MORNING = 'Morning',
  MIDDAY = 'Midday',
  AFTERNOON = 'Afternoon',
  EVENING = 'Evening',
}
const getLocalKey = (key: TimeChoices) => {
  switch (key) {
    case TimeChoices.AFTERNOON:
      return 'calendar.afternoon';
    case TimeChoices.MIDDAY:
      return 'calendar.midday';
    case TimeChoices.EVENING:
      return 'calendar.evening';
    case TimeChoices.MORNING:
      return 'calendar.morning';
  }
};

const Calendar = ({ onSuccess }: CalendarItemProps) => {
  const [activeTime, setActiveTime] = useState<TimeChoices>(
    TimeChoices.MORNING,
  );
  const { t } = useTranslation();
  const language = useSelector(selectLanguage);
  const [activeDate, setActiveDate] = useState<Date>(getToday());
  useEffect(() => {
    const date = moment(activeDate);
    date.utcOffset(0, true);
    const result = {
      start: date.clone().startOf('day'),
      end: date.clone().startOf('day'),
    };

    switch (activeTime) {
      case TimeChoices.AFTERNOON:
        result.start.hour(14).minute(0).second(0);
        result.end.hour(18).minute(0).second(0);
        break;
      case TimeChoices.MIDDAY:
        result.start.hour(10).minute(0).second(0);
        result.end.hour(14).minute(0).second(0);
        break;
      case TimeChoices.EVENING:
        result.start.hour(18).minute(0).second(0);
        result.end.hour(22).minute(0).second(0);
        break;
      case TimeChoices.MORNING:
        result.start.hour(6).minute(0).second(0);
        result.end.hour(10).minute(0).second(0);
    }
    onSuccess({ start: result.start.toDate(), end: result.end.toDate() });
  }, [activeDate, activeTime]);
  const [modal, setModal] = useState<boolean>(false);
  const updateTime = (updatedTime: TimeChoices) => {
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
      <View style={CalendarStyle.dateSection}>
        <CustomSelectionButton
          style={CalendarStyle.dateButtons}
          active={isTodayActive(activeDate)}
          onPress={() => {
            setActiveDate(getToday());
          }}>
          <Text style={Typography.textSmall}>{t('calendar.today')}</Text>
        </CustomSelectionButton>
        <CustomSelectionButton
          style={CalendarStyle.dateButtons}
          active={isTomorrowActive(activeDate)}
          onPress={() => {
            setActiveDate(getTomorrow());
          }}>
          <Text style={Typography.textSmall}>{t('calendar.tomorrow')}</Text>
        </CustomSelectionButton>
        <CustomSelectionButton
          style={CalendarStyle.dateButtons}
          active={isSelectedDate(activeDate)}
          onPress={() => {
            setModal(true);
          }}>
          <Text style={Typography.textSmall}>{t('calendar.selectDate')}</Text>
        </CustomSelectionButton>
      </View>
      <View style={CalendarStyle.infoSection}>
        <Text style={Typography.textSmall}>
          {getTranslatedDate(activeDate)} | {t(getLocalKey(activeTime))}
        </Text>
      </View>
      <View style={CalendarStyle.timeSection}>
        <View style={CalendarStyle.timeSectionRow}>
          <CustomSelectionButton
            style={CalendarStyle.timeButton}
            active={TimeChoices.MORNING === activeTime}
            onPress={() => {
              updateTime(TimeChoices.MORNING);
            }}>
            <SunRiseIcon />
            <Text style={Typography.textSmall}>
              {t(getLocalKey(TimeChoices.MORNING))}
            </Text>
            <Text style={Typography.textSmall}>
              {t('calendar.morningTimeRange')}
            </Text>
          </CustomSelectionButton>
          <CustomSelectionButton
            style={CalendarStyle.timeButton}
            active={TimeChoices.MIDDAY === activeTime}
            onPress={() => {
              updateTime(TimeChoices.MIDDAY);
            }}>
            <SunIcon />
            <Text style={Typography.textSmall}>
              {t(getLocalKey(TimeChoices.MIDDAY))}
            </Text>
            <Text style={Typography.textSmall}>
              {t('calendar.middayTimeRange')}
            </Text>
          </CustomSelectionButton>
        </View>
        <View style={CalendarStyle.timeSectionRow}>
          <CustomSelectionButton
            style={CalendarStyle.timeButton}
            active={TimeChoices.AFTERNOON === activeTime}
            onPress={() => {
              updateTime(TimeChoices.AFTERNOON);
            }}>
            <SunSetIcon />
            <Text style={Typography.textSmall}>
              {t(getLocalKey(TimeChoices.AFTERNOON))}
            </Text>
            <Text style={Typography.textSmall}>
              {t('calendar.eveningTimeRange')}
            </Text>
          </CustomSelectionButton>
          <CustomSelectionButton
            style={CalendarStyle.timeButton}
            active={TimeChoices.EVENING === activeTime}
            onPress={() => {
              updateTime(TimeChoices.EVENING);
            }}>
            <MoonIcon />
            <Text style={Typography.textSmall}>
              {t(getLocalKey(TimeChoices.EVENING))}
            </Text>
            <Text style={Typography.textSmall}>
              {t('calendar.afternoonTimeRange')}
            </Text>
          </CustomSelectionButton>
        </View>
      </View>
    </View>
  );
};

export default Calendar;
