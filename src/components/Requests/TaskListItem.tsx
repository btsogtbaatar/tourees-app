import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { TaskModel } from '../../modules/Request/entities/request.model';
import { SharedModel } from '../../modules/Shared/entities/shared.model';
import { colors } from '../../theme';
import { formatDate, formatTime } from '../../utilities/date';
import {
  CalendarIcon,
  ClockIcon,
  LocationCircleGrayIcon,
  LocationIcon,
} from '../Icon';
import TaskListItemStyle from './TaskListItem.style';

interface TaskListItemProps {
  task: TaskModel.TaskResponse;
}

const TaskListItem = ({ task: item }: TaskListItemProps) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const onPress = () => {
    navigation.navigate('TaskDetail', {
      id: item.id,
    });
  };
  return (
    <TouchableOpacity style={TaskListItemStyle.container} onPress={onPress}>
      <View style={TaskListItemStyle.left}>
        <Text style={TaskListItemStyle.name}>{item.name}</Text>
        <View style={TaskListItemStyle.details}>
          <View style={TaskListItemStyle.detailRow}>
            <LocationCircleGrayIcon width={16} height={16} />
            <Text style={TaskListItemStyle.info}>
              {item.addresses[0].displayName}
            </Text>
          </View>
          {(item.subCategory.locationType === null ||
            item.subCategory.locationType ===
              SharedModel.CategoryLocationType.Route) && (
            <View style={TaskListItemStyle.detailRow}>
              <LocationIcon width={16} height={16} color={colors.gray700} />
              <Text style={TaskListItemStyle.info}>
                {item.addresses[1].displayName}
              </Text>
            </View>
          )}
          <View style={TaskListItemStyle.detailRow}>
            <CalendarIcon width={16} height={16} color={colors.gray700} />
            <Text style={TaskListItemStyle.info}>
              {formatDate(item.timeRange.start)}
            </Text>
          </View>
          <View style={TaskListItemStyle.detailRow}>
            <ClockIcon width={16} height={16} color={colors.gray700} />
            <Text style={TaskListItemStyle.info}>
              {formatTime(item.timeRange.start)} -{' '}
              {formatTime(item.timeRange.end)}
            </Text>
          </View>
        </View>
        <View style={TaskListItemStyle.detailRow}>
          <Text style={TaskListItemStyle.status}>
            {t(`request.status.${item.status}`)}
          </Text>
          <Text style={TaskListItemStyle.dot}>•</Text>
          <Text style={TaskListItemStyle.infoExtra}>
            {item.offers.length} {t('request.offer')}
          </Text>
        </View>
      </View>
      <View>
        <Text style={TaskListItemStyle.price}>
          {Intl.NumberFormat().format(item.budget ?? 0)}₮
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TaskListItem;
