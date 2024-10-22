import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AboutTaskerProfile from '../../../../components/AboutTaskerProfile/AboutTaskerProfile';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomCurrencyView from '../../../../components/CustomCurrencyView/CustomCurrencyView';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import { LaptopIcon, LocationIcon } from '../../../../components/Icon';
import RemarkTextView from '../../../../components/RemarkTextView/RemarkTextView';
import SliderImages from '../../../../components/SliderImages/SliderImages';
import { RootStackParamList } from '../../../../navigation/types';
import { colors } from '../../../../theme';
import { SharedModel } from '../../../Shared/entities/shared.model';
import { getTaskerServiceDetail } from '../../service/tasker.service';
import TaskerServiceViewStyle from './TaskerServiceView.style';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskerServiceView'>;
const TaskerServiceView = (props: Props) => {
  const { id } = props.route.params;
  const { t } = useTranslation();
  const [taskerService, setTaskerService] =
    useState<SharedModel.TaskerServiceModel>();
  const navigation = useNavigation();

  const getServiceDetail = () => {
    getTaskerServiceDetail(id).then((res: SharedModel.TaskerServiceModel) => {
      setTaskerService(res);
    });
  };

  useEffect(() => {
    getServiceDetail();
  }, []);

  const renderName = (lastName?: string, firstName?: string) => {
    if (lastName && firstName)
      return lastName.charAt(0).concat('.').concat(firstName);
    return '';
  };

  return (
    <CustomSafeAreaView>
      {taskerService?.files && <SliderImages images={taskerService.files} />}
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
        {taskerService?.contractor && taskerService?.contractor.user && (
          <AboutTaskerProfile
            name={renderName(
              taskerService.contractor.user.lastName,
              taskerService.contractor.user.firstName,
            )}
            imageUrl={taskerService.contractor.profilePicture?.url}
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
        <TouchableOpacity
          style={TaskerServiceViewStyle.contactContainer}
          onPress={() => {
            navigation.navigate('Chat', {
              id:
                (taskerService?.contractor &&
                  taskerService?.contractor.user &&
                  taskerService?.contractor.user.id) ??
                1,
            });
          }}>
          <Text style={TaskerServiceViewStyle.contactText}>Contact Tasker</Text>
        </TouchableOpacity>
      </ContainerView>
    </CustomSafeAreaView>
  );
};

export default TaskerServiceView;
