import { useNavigation } from '@react-navigation/core';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomImage from '../../../../components/CustomImage/CustomImage';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import FullHeightView from '../../../../components/FullHeightView/FullHeightView';
import HeaderBar from '../../../../components/HeaderBar/HeaderBar';
import { HeaderEditIcon } from '../../../../components/Icon';
import RemarkTextView from '../../../../components/RemarkTextView/RemarkTextView';
import { horizontalScale, moderateScale } from '../../../../utilities/metrics';
import { TaskerModel } from '../../entities/tasker.model';
import { getTaskerView } from '../../service/tasker.service';
import { TaskerViewStyle } from './TaskerView.style';

const TaskerView = () => {
  const isFocused = useIsFocused();
  const [taskerView, setTaskerView] =
    useState<TaskerModel.TaskerRequestProps>();
  const { t } = useTranslation();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <HeaderBar
          backButtonVisible={true}
          title={t('headers.taskerProfile')}
          suffix={
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('TaskerStack', {
                  screen: 'RegisterTasker',
                  params: { taskerView: taskerView },
                });
              }}>
              <HeaderEditIcon />
            </TouchableOpacity>
          }
        />
      ),
    });
  }, [taskerView]);

  useEffect(() => {
    if (isFocused) {
      getTaskerView().then(res => {
        setTaskerView(res);
      });
    }
  }, [isFocused]);

  return (
    <CustomSafeAreaView>
      <FullHeightView>
        <ScrollView>
          <ContainerView>
            <RemarkTextView label={t('tasker.tag')} text={taskerView?.tag} />
            <RemarkTextView
              label={t('tasker.description')}
              text={taskerView?.description}
            />
            <Text style={TaskerViewStyle.headerLabael}>{t('Skills')}</Text>
            <RemarkTextView
              label={t('tasker.education')}
              arrayText={taskerView?.education}
            />
            <RemarkTextView
              label={t('tasker.specialities')}
              arrayText={taskerView?.specialities}
            />
            <RemarkTextView
              label={t('tasker.languages')}
              arrayText={taskerView?.languages}
            />
            <RemarkTextView
              label={t('tasker.rank')}
              arrayText={taskerView?.ranks}
            />
            <RemarkTextView
              label={t('tasker.transportation')}
              arrayText={taskerView?.transportation}
            />
            <RemarkTextView label={t('tasker.portfolio')} />
            <FlatList
              keyExtractor={(_, index) => index.toString()}
              data={taskerView?.files}
              numColumns={4}
              columnWrapperStyle={{ gap: horizontalScale(12) }}
              contentContainerStyle={{ gap: horizontalScale(12) }}
              renderItem={({ item }) => (
                <CustomImage
                  source={{ uri: item.url }}
                  width={horizontalScale(72)}
                  height={horizontalScale(72)}
                  style={{
                    borderRadius: moderateScale(12),
                    // marginHorizontal: horizontalScale(8),
                  }}
                  resizeMode="cover"
                />
              )}
            />
          </ContainerView>
        </ScrollView>
      </FullHeightView>
    </CustomSafeAreaView>
  );
};

export default TaskerView;
