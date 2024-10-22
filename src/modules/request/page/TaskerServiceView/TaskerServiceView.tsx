import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import { verticalScale } from '../../../../utilities';
import CustomCurrencyView from '../../../../components/CustomCurrencyView/CustomCurrencyView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../navigation/types';
import { getTaskerServiceDetail } from '../../service/tasker.service';
import { SharedModel } from '../../../Shared/entities/shared.model';
import RemarkTextView from '../../../../components/RemarkTextView/RemarkTextView';
import { LaptopIcon, LocationIcon } from '../../../../components/Icon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../../../theme';
import CustomImage from '../../../../components/CustomImage/CustomImage';
import { RemarkTextViewStyle } from '../../../../components/RemarkTextView/RemarkTextView.style';
import AboutTaskerProfile from '../../../../components/AboutTaskerProfile/AboutTaskerProfile';
import TaskerServiceViewStyle from './TaskerServiceView.style';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskerServiceView'>;

const TaskerServiceView = (props: Props) => {
  const { id } = props.route.params;
  const { t } = useTranslation();
  const [taskerService, setTaskerService] =
    useState<SharedModel.TaskerServiceModel>();

  const getServiceDetail = () => {
    getTaskerServiceDetail(id).then((res: SharedModel.TaskerServiceModel) => {
      setTaskerService(res);
    });
  };

  useEffect(() => {
    getServiceDetail();
  }, []);

  return (
    <CustomSafeAreaView>
      {taskerService?.files && taskerService?.files[0] && (
        <CustomImage
          source={{ uri: taskerService?.files[0].url }}
          height={200}
          resizeMode="cover"
        />
      )}
      <ContainerView>
        <Text style={TaskerServiceViewStyle.nameStyle}>
          {taskerService?.name}
        </Text>
        {taskerService?.address ? (
          <View style={TaskerServiceViewStyle.addressStyle}>
            <LocationIcon color={colors.primaryGradient} />
            <Text>{taskerService?.address.displayName}</Text>
          </View>
        ) : (
          <View>
            <View style={TaskerServiceViewStyle.addressStyle}>
              <LaptopIcon color={colors.primaryGradient} />
              <Text>{t('service.onlineService')}</Text>
            </View>
          </View>
        )}
        <CustomCurrencyView amount={taskerService?.price} />

        <TouchableOpacity style={TaskerServiceViewStyle.packageContainer}>
          <Text style={TaskerServiceViewStyle.contactText}>View Packages</Text>
        </TouchableOpacity>
        {taskerService?.files && taskerService?.files[0] && (
          <AboutTaskerProfile
            name="Jasmina N."
            imageUrl={taskerService?.files[0].url}
          />
        )}
        <RemarkTextView
          label={'description'}
          text={taskerService?.description}
        />
        <RemarkTextView
          label={'Availability'}
          text={
            taskerService?.timeRange.start + ' ' + taskerService?.timeRange.end
          }
        />
        <TouchableOpacity style={TaskerServiceViewStyle.contactContainer}>
          <Text style={TaskerServiceViewStyle.contactText}>Contact Tasker</Text>
        </TouchableOpacity>
      </ContainerView>
    </CustomSafeAreaView>
  );
};

export default TaskerServiceView;
