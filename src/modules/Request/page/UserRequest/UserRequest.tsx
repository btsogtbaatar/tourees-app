/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import moment from 'moment';
import React, { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
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
import AddressBottomSheetView, {
  Address,
} from '../../../../components/AddressBottomSheetView/AddressBottomSheetView';
import { AddressFormStyle } from '../../../../components/AddressForm/AddressForm.style';
import Calendar from '../../../../components/Calendar/Calendar';
import { CustomBottomSheet } from '../../../../components/CustomBottomSheet/CustomBottomSheet';
import CustomBottomScrollViewSheet from '../../../../components/CustomBottomSheetScrollView/CustomBottomSheetScrollView';
import CustomKeyboardAvoidingView from '../../../../components/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';
import FooterButton from '../../../../components/FooterButton/FooterButton';
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
import { uploadFile } from '../../../shared/service/shared.service';
import { TaskModel } from '../../entities/request.model';
import { RequestStackParamList } from '../../navigation/types';
import { createTask } from '../../service/request.service';

enum AddressType {
  From,
  To,
}

type Props = NativeStackScreenProps<RequestStackParamList, 'UserRequest'>;

function UserRequest({ route }: Props) {
  const { t } = useTranslation();
  const bottomSheetRef = useRef<BottomSheet>(null);
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

  const [addressType, setAddressType] = useState<AddressType>(AddressType.From);
  const form = useForm();

  const [toAddress, setToAddress] = useState<Address>();
  const [fromAddress, setFromAddress] = useState<Address>();

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
        console.log('🚀 ~ handleImageSelection ~ res:', res);
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
        validateAndDispatchModal(fromAddress, t('request.requestAddressMsg')) ||
        validateAndDispatchModal(toAddress, t('request.requestAddressMsg'))
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
        addresses: [
          { ...fromAddress!, name: 'from' },
          { ...toAddress!, name: 'to' },
        ],
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
              <Text style={[Typography.textSmallBold, { marginBottom: 8 }]}>
                {t('request.requestDestinationAddress')}
              </Text>
              <View style={[AddressFormStyle.container, { marginBottom: 16 }]}>
                <LocationCircleIcon style={AddressFormStyle.icon} />
                <Text
                  numberOfLines={2}
                  style={[Typography.textSmallerMedium, { flex: 1 }]}>
                  {fromAddress?.addressLine2 ??
                    t('request.requestDestinationAddress')}
                </Text>
                <Text
                  onPress={() => {
                    bottomSheetRef.current?.expand();
                    setAddressType(AddressType.From);
                  }}
                  style={[
                    Typography.textSmallBold,
                    { color: colors.primaryColor, marginLeft: 8 },
                  ]}>
                  {t('request.requestEdit')}
                </Text>
              </View>
              <View style={AddressFormStyle.container}>
                <LocationIcon style={AddressFormStyle.icon} />
                <Text
                  numberOfLines={2}
                  style={[Typography.textSmallerMedium, { flex: 1 }]}>
                  {toAddress?.addressLine2 ??
                    t('request.requestDeliveryAddress')}
                </Text>
                <Text
                  onPress={() => {
                    bottomSheetRef.current?.expand();
                    setAddressType(AddressType.To);
                  }}
                  style={[
                    Typography.textSmallBold,
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
        <CustomBottomSheet ref={bottomSheetRef}>
          <CustomBottomScrollViewSheet>
            <AddressBottomSheetView
              value={addressType === AddressType.From ? fromAddress : toAddress}
              onChange={address => {
                console.log('🚀 ~ UserRequest ~ address:', address);
                if (addressType === AddressType.From) {
                  setFromAddress(address);
                } else {
                  setToAddress(address);
                }

                form.setValue(addressType.toString(), address.addressLine2);
              }}
            />
            <View style={{ marginHorizontal: 16 }}>
              <FooterButton
                extra={{
                  position: 'absolute',
                  bottom: 20,
                  backgroundColor: 'transparent',
                  padding: 0,
                }}
                backColor
                back={true}
                text={'Болсон'}
                onPress={() => bottomSheetRef.current?.close()}
                btnDisabled={false}
                onBackPress={() => bottomSheetRef.current?.close()}
              />
            </View>
          </CustomBottomScrollViewSheet>
        </CustomBottomSheet>
      </LinearGradient>
    </CustomKeyboardAvoidingView>
  );
}

export default UserRequest;
