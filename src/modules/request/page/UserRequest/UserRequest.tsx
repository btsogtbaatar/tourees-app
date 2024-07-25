/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getEnv } from '../../../../api';
import { LocationCircleIcon, LocationIcon } from '../../../../assets/svg';
import Calendar from '../../../../components/Calendar/Calendar';
import CustomKeyboardAvoidingView from '../../../../components/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import {
  DEFAULT_LAT,
  DEFAULT_LNG,
} from '../../../../components/CustomMapView/CustomMapView';
import ImageUploadButton, {
  ImageSource,
} from '../../../../components/ImageUploadButton/ImageUploadButton';
import Modal from '../../../../components/Modal/Modal';
import WelcomeModal from '../../../../components/Modal/WelcomeModal';
import { colors } from '../../../../constants/colors';
import { Typography } from '../../../../constants/typography';
import { authStore } from '../../../../context/auth/store';
import { ModalContext } from '../../../../context/modal/modal.context';
import { actions } from '../../../../context/modal/modal.reducer';
import { horizontalScale, verticalScale } from '../../../../utilities';
import { SharedModel } from '../../../shared/entities/shared.model';
import { Addresses } from '../../../shared/page/MapViewAddress/AddressMapView';
import { uploadFile } from '../../../shared/service/shared.service';
import { AddressType, TaskModel } from '../../entities/request.model';
import { RequestStackParamList } from '../../navigation/types';
import { createTask, getTasks } from '../../service/request.service';
import UserRequestStyle from './UserRequest.style';

type Props = NativeStackScreenProps<RequestStackParamList, 'UserRequest'>;

function UserRequest({ route }: Props) {
  const { t } = useTranslation();
  const rootNavigation = useNavigation();
  const subCategory = route.params.item;
  const navigation = useNavigation<RequestStackParamList>();
  const authState = authStore(state => state);
  const { dispatch: dispatchModal } = useContext(ModalContext);
  const [selectedImages, setSelectedImages] = useState<SharedModel.File[]>([]);
  const [requestValue, setRequestValue] = useState<any>({
    user_id: authState.auth ? authState.auth.user?.id : undefined,
    name: authState.auth ? authState.auth.user?.fullName : '',
    status_code: 1,
    sub_category_id: subCategory.id,
  });

  const [addresses, setAddresses] = useState<Addresses>({
    from: {
      name: AddressType.To,
      latitude: DEFAULT_LAT,
      longitude: DEFAULT_LNG,
    },
    to: {
      name: AddressType.From,
      latitude: DEFAULT_LAT,
      longitude: DEFAULT_LNG,
    },
  });

  useEffect(() => {
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
                  navigation.navigate('HomeStack', { screen: 'Home' });
                }}
                buttonText={t('request.requestDone')}
              />
            ),
          });

          navigation.navigate('HomeStack', { screen: 'Home' });
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
      navigation.navigate('AuthStack', {
        screen: 'Login',
      });
    }
  };

  return (
    <CustomKeyboardAvoidingView>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        locations={[0, 1]}
        colors={['#37414B', '#161A1E']}
        style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              paddingHorizontal: horizontalScale(16),
              paddingBottom: verticalScale(16),
              flexDirection: 'row',
            }}>
            <View
              style={{
                paddingRight: 16,
                alignItems: 'flex-start',
                width: '70%',
              }}>
              <Text
                style={{
                  color: colors.textWhite,
                  fontSize: 18,
                  fontFamily: 'Nunito',
                  fontWeight: '700',
                  lineHeight: 27,
                }}>
                {t('request.requestCreate')}
              </Text>
              <Text
                style={{
                  color: colors.textWhite,
                  fontFamily: 'Nunito',
                  fontSize: 20,
                  fontWeight: '800',
                  lineHeight: 30,
                }}>
                {subCategory.name}
              </Text>
              <Text
                style={{
                  color: colors.textWhite,
                  fontFamily: 'Nunito',
                  fontSize: 12,
                  fontWeight: '400',
                  lineHeight: 18,
                }}>
                {subCategory.description}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                backgroundColor: 'red',
              }}>
              <Image
                style={{ flex: 1, width: '100%' }}
                source={{
                  uri: `${getEnv().IMAGE_URL}${subCategory.image?.url ?? ''}`,
                }}
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.textWhite,
              borderTopEndRadius: 16,
              borderTopStartRadius: 16,
            }}>
            <View
              style={{
                height: verticalScale(45),
                justifyContent: 'center',
                alignItems: 'center',
              }}></View>
            <ScrollView
              style={{ flex: 1, paddingHorizontal: horizontalScale(16) }}>
              <Text
                style={{
                  fontFamily: 'Nunito',
                  fontWeight: '500',
                  lineHeight: 21,
                }}>
                {t('request.requestDeliveryDate')}
              </Text>
              <Calendar
                onSuccess={(value: string) =>
                  handleInputChange(
                    'request_date',
                    moment(value).format('YYYY-MM-DD'),
                  )
                }
                initialStartDate={moment().format('YYYY-MM-DD')}
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
                  placeholder={t('request.requestDetailMsg')}
                  returnKeyType="next"
                />
              </View>
              <Text style={[Typography.textSmall, { marginBottom: 8 }]}>
                {t('userRequest.address.label')}
              </Text>
              <View style={[UserRequestStyle.container, { marginBottom: 16 }]}>
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
                    { color: colors.primaryColor, marginLeft: 8 },
                  ]}>
                  {t('request.requestEdit')}
                </Text>
              </View>
              <View style={UserRequestStyle.container}>
                <LocationIcon style={UserRequestStyle.icon} />
                <Text
                  numberOfLines={2}
                  style={[Typography.textSmaller, { flex: 1 }]}>
                  {addresses.to?.address ?? t('request.requestDeliveryAddress')}
                </Text>
                <Text
                  onPress={() => {
                    rootNavigation.navigate('AddressMapView', {
                      addresses: addresses,
                      addressType: AddressType.To,
                      onGoBack: setAddresses,
                    });
                  }}
                  style={[
                    Typography.textSmall,
                    { color: colors.primaryColor, marginLeft: 8 },
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
                      color: colors.textWhite,
                      fontFamily: 'Nunito',
                      fontWeight: '700',
                      lineHeight: 21,
                    }}>
                    Үргэлжлүүлэх
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </ScrollView>
          </View>
        </View>
      </LinearGradient>
    </CustomKeyboardAvoidingView>
  );
}

export default UserRequest;
