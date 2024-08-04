import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Calendar from '../../../../components/Calendar/Calendar';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomImage from '../../../../components/CustomImage/CustomImage';
import {
  DEFAULT_LAT,
  DEFAULT_LNG,
} from '../../../../components/CustomMapView/CustomMapView';
import FullHeightView from '../../../../components/FullHeightView/FullHeightView';
import { LocationCircleIcon, LocationIcon } from '../../../../components/Icon';
import ImageUploadButton, {
  ImageSource,
} from '../../../../components/ImageUploadButton/ImageUploadButton';
import Modal from '../../../../components/Modal/Modal';
import WelcomeModal from '../../../../components/Modal/WelcomeModal';
import { authStore } from '../../../../context/auth/store';
import { ModalContext } from '../../../../context/modal/modal.context';
import { actions } from '../../../../context/modal/modal.reducer';
import { RootStackParamList } from '../../../../navigation/types';
import { colors } from '../../../../theme/colors';
import { Typography } from '../../../../theme/typography';
import { horizontalScale, verticalScale } from '../../../../utilities';
import { SharedModel } from '../../../Shared/entities/shared.model';
import { Addresses } from '../../../Shared/page/AddressMapView/AddressMapView';
import { uploadFile } from '../../../Shared/service/shared.service';
import { AddressType, TaskModel } from '../../entities/request.model';
import { createTask, getTasks } from '../../service/request.service';
import UserRequestStyle from './UserRequest.style';

type Props = NativeStackScreenProps<RootStackParamList, 'UserRequest'>;

function UserRequest({ route }: Props) {
  const { t } = useTranslation();
  const rootNavigation = useNavigation();
  const subCategory = route.params.item;
  const navigation = useNavigation();
  const authState = authStore(state => state);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { dispatch: dispatchModal } = useContext(ModalContext);
  const [selectedImages, setSelectedImages] = useState<SharedModel.File[]>([]);
  const [requestValue, setRequestValue] = useState<any>({
    user_id: authState.auth ? authState.auth.user?.id : undefined,
    name: authState.auth ? authState.auth.user?.fullName : '',
    status_code: 1,
    sub_category_id: subCategory.id,
    timeRange: {},
  });

  const [addresses, setAddresses] = useState<Addresses>({
    from: {
      name: AddressType.From,
      latitude: DEFAULT_LAT,
      longitude: DEFAULT_LNG,
    },
    to: {
      name: AddressType.To,
      latitude: DEFAULT_LAT,
      longitude: DEFAULT_LNG,
    },
  });

  useEffect(() => {
    if (authState.authenticated) {
      getTasks(1, 1).then(page => {
        if (
          page.content.length > 0 &&
          page.content[0].addresses !== undefined &&
          page.content[0].addresses.length > 0
        ) {
          let fromAddress = page.content[0].addresses.find(
            _address => _address.name === 'from',
          );

          if (fromAddress) {
            setAddresses(_addresses => {
              return {
                ..._addresses,
                from: fromAddress,
              };
            });
          }
        }
      });
    }
  }, []);

  const handleInputChange = (
    fieldName: keyof typeof requestValue,
    value: any,
  ) => {
    setRequestValue({ ...requestValue, [fieldName]: value });
  };

  const handleImageSelection = (images: ImageSource[]) => {
    let image = images.pop();

    if (image) {
      uploadFile({
        uri:
          Platform.OS === 'ios' ? image.uri?.replace('file://', '') : image.uri,
        name: image.name,
        type: image.type,
      }).then((res: SharedModel.File) => {
        setSelectedImages(_selectedImages => [..._selectedImages, res]);
      });
    }
  };

  const submit = () => {
    if (authState.authenticated) {
      const data = new FormData();

      const validateAndDispatchModal = (value: any, title: string) => {
        if (!value) {
          dispatchModal({
            type: actions.SHOW,
            component: <Modal title={title} />,
          });
          return true;
        }
        return false;
      };

      if (
        validateAndDispatchModal(
          requestValue.details,
          t('request.requestDetailWarning'),
        ) ||
        validateAndDispatchModal(
          addresses.from,
          t('request.requestAddressMsg'),
        ) ||
        validateAndDispatchModal(addresses.to, t('request.requestAddressMsg'))
      ) {
        return;
      }

      selectedImages.forEach((image: ImageSource) => {
        if (image.uri !== undefined) {
          data.append(
            'files[]',
            JSON.stringify({
              uri: image.uri,
              name: image.name,
              type: image.type,
            }),
          );
        }
      });

      let taskRequest: TaskModel.TaskRequest = {
        description: requestValue.details,
        timeRange: requestValue.timeRange,
        subCategory: {
          id: requestValue.sub_category_id,
        },

        files: selectedImages,
        addresses: [addresses.from, addresses.to],
      };

      createTask(taskRequest).then(
        (res: any) => {
          console.log(res);

          dispatchModal({
            type: actions.SHOW,
            component: (
              <WelcomeModal
                title={''}
                subTitle={t('request.requestNewMessage')}
                onClick={() => {
                  dispatchModal({ type: actions.HIDE });
                  navigation.navigate('HomeTab', { screen: 'Home' });
                }}
                buttonText={t('request.requestDone')}
              />
            ),
          });

          navigation.navigate('HomeTab', { screen: 'Home' });
        },
        (err: any) => {
          console.log(err, 'errr');
          dispatchModal({
            type: actions.SHOW,
            component: <Modal title={err.message} />,
          });
        },
      );
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={UserRequestStyle.container}>
      <FullHeightView>
        <ContainerView style={{ flexDirection: 'row', gap: 20 }}>
          <View style={{ flex: 2 }}>
            <Text style={UserRequestStyle.title}>{subCategory.name}</Text>
            <Text style={UserRequestStyle.subtitle}>
              {subCategory.description}
            </Text>
          </View>
          <CustomImage
            style={UserRequestStyle.image}
            source={{
              uri: subCategory.image.url,
            }}
          />
        </ContainerView>
        <View style={UserRequestStyle.bodyContainer}>
          <ScrollView>
            <ContainerView>
              <Text
                style={{
                  fontFamily: 'Nunito',
                  fontWeight: '500',
                  lineHeight: 21,
                }}>
                {t('request.requestDeliveryDate')}
              </Text>
              <Calendar
                onSuccess={(value: any) =>
                  handleInputChange('timeRange', value)
                }
              />
              <Text
                style={{
                  fontFamily: 'Nunito',
                  fontWeight: '500',
                  lineHeight: 21,
                }}>
                {t('request.requestImages')}
              </Text>
              <ImageUploadButton onImageSelection={handleImageSelection} />
              <Text
                style={{
                  fontFamily: 'Nunito',
                  fontWeight: '500',
                  lineHeight: 21,
                }}>
                {t('request.requestDetail')}
              </Text>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: horizontalScale(12),
                  marginVertical: verticalScale(16),
                  borderWidth: 1,
                  borderColor: colors.borderColor,
                  borderRadius: 16,
                  height: 88,
                  paddingVertical: verticalScale(6),
                }}>
                <Text style={{ color: '#AFB3B7', lineHeight: 18 }}>
                  {t('request.requestDetail')}
                </Text>
                <TextInput
                  value={requestValue?.details}
                  onChangeText={(value: string) =>
                    handleInputChange('details', value)
                  }
                  style={{
                    fontSize: 16,
                    fontFamily: 'Nunito',
                    fontWeight: '600',
                    lineHeight: 24,
                    color: colors.gray700,
                  }}
                  multiline={true}
                  numberOfLines={4}
                  placeholder={subCategory.instruction}
                  returnKeyType="next"
                />
              </View>
              <Text style={[Typography.textSmall, { marginBottom: 8 }]}>
                {t('userRequest.address.label')}
              </Text>
              <View
                style={[
                  UserRequestStyle.addressContainer,
                  { marginBottom: 16 },
                ]}>
                <LocationCircleIcon style={UserRequestStyle.icon} />
                <Text
                  numberOfLines={2}
                  style={[Typography.textSmaller, { flex: 1 }]}>
                  {addresses.from?.address ??
                    t('request.requestDestinationAddress')}
                </Text>
                <Text
                  onPress={() => {
                    rootNavigation.navigate('AddressMapView', {
                      addresses: addresses,
                      addressType: AddressType.From,
                      onGoBack: setAddresses,
                    });
                  }}
                  style={[
                    Typography.textSmall,
                    { color: colors.primary500, marginLeft: 8 },
                  ]}>
                  {t('request.requestEdit')}
                </Text>
              </View>
              <View style={UserRequestStyle.addressContainer}>
                <LocationIcon style={UserRequestStyle.icon} />
                <Text
                  numberOfLines={2}
                  style={[Typography.textSmaller, { flex: 1 }]}>
                  {addresses.to?.address ?? t('request.requestDeliveryAddress')}
                </Text>
                <Text
                  onPress={() => {
                    bottomSheetRef.current?.expand();
                    // rootNavigation.navigate('AddressMapView', {
                    //   addresses: addresses,
                    //   addressType: AddressType.To,
                    //   onGoBack: setAddresses,
                    // });
                  }}
                  style={[
                    Typography.textSmall,
                    { color: colors.primary500, marginLeft: 8 },
                  ]}>
                  {t('request.requestEdit')}
                </Text>
              </View>

              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                locations={[0, 1]}
                colors={['#FF9646', '#FA6432']}
                style={{
                  borderRadius: horizontalScale(12),
                  marginVertical: verticalScale(16),
                }}>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: horizontalScale(12),
                    height: verticalScale(40),
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxHeight: verticalScale(40),
                  }}
                  onPress={submit}>
                  <Text
                    style={{
                      color: colors.white,
                      fontFamily: 'Nunito',
                      fontWeight: '700',
                      lineHeight: 21,
                    }}>
                    Үргэлжлүүлэх
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </ContainerView>
          </ScrollView>
        </View>
      </FullHeightView>
    </View>
  );
}

export default UserRequest;