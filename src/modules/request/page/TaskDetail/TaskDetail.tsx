import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomGradientButton from '../../../../components/CustomButton/CustomGradientButton';
import CustomImage from '../../../../components/CustomImage/CustomImage';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import {
  CalendarIcon,
  LocationCircleGrayIcon,
  LocationIcon,
} from '../../../../components/Icon';
import Loading from '../../../../components/Loading/Loading';
import Offer from '../../../../components/Offer/Offer';
import { RootStackParamList } from '../../../../navigation/types';
import { colors, Typography } from '../../../../theme';
import { formatDate, formatTime } from '../../../../utilities/date';
import { getImageUrl } from '../../../../utilities/image';
import { selectUser } from '../../../Auth/slice/authSlice';
import { SharedModel } from '../../../Shared/entities/shared.model';
import { TaskModel, TaskStatus } from '../../entities/request.model';
import { getTask } from '../../service/request.service';
import { TaskDetailStyle } from './TaskDetail.style';
type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetail'>;

const TaskDetail = (props: Props) => {
  const { id } = props.route.params;
  const [task, setTask] = useState<TaskModel.TaskResponse>();
  const { t } = useTranslation();
  const rootNavigation = useNavigation();
  const isFocused = useIsFocused();
  const user = useSelector(selectUser);

  useEffect(() => {
    fetchTask();
  }, [isFocused]);

  const fetchTask = () => {
    getTask(id).then(res => {
      setTask(res);
    });
  };

  const formattedDate = () => {
    return moment(task?.createdDate).format('yyyy-MM-DD mm:ss');
  };

  if (!task) {
    return <Loading />;
  }

  return (
    <CustomSafeAreaView style={{ backgroundColor: colors.white }}>
      <ScrollView>
        <ContainerView style={TaskDetailStyle.container}>
          <View style={TaskDetailStyle.header}>
            <Text style={TaskDetailStyle.title}>{task?.name}</Text>
            <Text style={TaskDetailStyle.status}>
              {t(`request.status.${task?.status}`)}
            </Text>
          </View>
          <View style={[TaskDetailStyle.row, { alignItems: 'flex-start' }]}>
            <View style={TaskDetailStyle.col}>
              <Text style={TaskDetailStyle.label}>{t('request.postedBy')}</Text>
              <Text style={TaskDetailStyle.text}>
                {task?.customer.user.firstName} {task?.customer.user.lastName}
              </Text>
            </View>
            <Text style={TaskDetailStyle.date}>{formattedDate()}</Text>
          </View>
          <View style={TaskDetailStyle.row}>
            <LocationCircleGrayIcon
              height={24}
              width={24}
              color={colors.gray700}
            />
            <View style={TaskDetailStyle.col}>
              <Text style={TaskDetailStyle.label}>
                {t('request.requestDestinationAddress')}
              </Text>
              <Text style={TaskDetailStyle.text}>
                {task?.addresses[0].address}
              </Text>
            </View>
          </View>
          {/* TODO: Fix this */}
          {(task.subCategory.locationType === null ||
            task.subCategory.locationType ===
              SharedModel.CategoryLocationType.Route) && (
            <View style={TaskDetailStyle.row}>
              <LocationIcon height={24} width={24} color={colors.gray700} />
              <View style={TaskDetailStyle.col}>
                <Text style={TaskDetailStyle.label}>
                  {t('request.requestDeliveryAddress')}
                </Text>
                <Text style={TaskDetailStyle.text}>
                  {task?.addresses[1].address}
                </Text>
              </View>
            </View>
          )}
          <View style={TaskDetailStyle.row}>
            <CalendarIcon height={24} width={24} color={colors.gray700} />
            <View style={TaskDetailStyle.col}>
              <Text style={TaskDetailStyle.label}>{t('request.date')}</Text>
              <Text style={TaskDetailStyle.text}>
                {formatDate(task?.timeRange.start)}
              </Text>
              <Text style={TaskDetailStyle.text}>
                {formatTime(task?.timeRange.start)} -{' '}
                {formatTime(task?.timeRange.end)}
              </Text>
            </View>
          </View>
          <View style={TaskDetailStyle.detail}>
            <Text style={TaskDetailStyle.label}>
              {t('request.requestDetail')}
            </Text>
            <Text style={TaskDetailStyle.text}>{task?.description}</Text>
          </View>
          <View style={TaskDetailStyle.detail}>
            <FlatList
              numColumns={4}
              scrollEnabled={false}
              data={task?.files}
              keyExtractor={(item, index) => item.id.toString()}
              renderItem={({ item, index }) => {
                return (
                  <TouchableWithoutFeedback
                    key={item.url}
                    onPress={() =>
                      rootNavigation.navigate('Photos', {
                        index,
                        images: task?.files.map(file => getImageUrl(file.url)),
                      })
                    }>
                    <CustomImage
                      key={item.id}
                      height={100}
                      width={100}
                      source={{ uri: item.url }}
                    />
                  </TouchableWithoutFeedback>
                );
              }}
            />
          </View>
          <View style={TaskDetailStyle.offer}>
            <Text style={TaskDetailStyle.offerTitle}>{t('request.price')}</Text>
            <Text style={TaskDetailStyle.price}>
              {Intl.NumberFormat().format(task?.budget ?? 0)}₮
            </Text>
            {task.customer.user.id !== user?.id &&
              task?.status !== TaskStatus.ASSIGNED && (
                <View style={{ width: '100%' }}>
                  <CustomGradientButton
                    title={t('request.offerButton')}
                    onPress={() =>
                      rootNavigation.navigate('CreateOffer', {
                        taskId: task.id,
                      })
                    }
                  />
                </View>
              )}
          </View>
          <View style={TaskDetailStyle.detail}>
            <Text style={TaskDetailStyle.label}>{t('request.offerLabel')}</Text>
            <FlatList
              data={task.offers}
              scrollEnabled={false}
              ListEmptyComponent={
                <Text style={{ ...Typography.textSmall }}>
                  {t('offer.notFound')}
                </Text>
              }
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    marginVertical: 20,
                  }}></View>
              )}
              keyExtractor={(item, index) => item.id.toString()}
              renderItem={({ item }) => {
                return (
                  <Offer
                    onApprove={() => fetchTask()}
                    task={task}
                    offer={item}
                  />
                );
              }}
            />
          </View>
        </ContainerView>
      </ScrollView>
    </CustomSafeAreaView>
  );
};

export default TaskDetail;
