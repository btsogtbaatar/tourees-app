import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useContext, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../../../../../../constants/Colors';
import { Typography } from '../../../../../../../constants/Typography';
import { getEnv } from '../../../../../../api';
import { requestsService } from '../../../../../../api/services/index';
import { LocationCircleIcon, LocationIcon } from '../../../../../../assets/svg';
import { authStore } from '../../../../../../context/auth/store';
import { ModalContext } from '../../../../../../context/modal/modal.context';
import {
  actions as ModalActions,
  actions,
} from '../../../../../../context/modal/modal.reducer';
import { DashboardStackParamList } from '../../../../../../types/DashboardStackParamList';
import {
  horizontalScale,
  verticalScale,
} from '../../../../../../uitls/metrics';
import AddressBottomSheetView from '../../../../../Component/AddressBottomSheetView/AddressBottomSheetView';
import { AddressFormStyle } from '../../../../../Component/AddressForm/AddressForm.style';
import Calendar from '../../../../../Component/Calendar/Calendar';
import CustomBottomSheet from '../../../../../Component/CustomBottomSheet/CustomBottomSheet';
import CustomInput from '../../../../../Component/CustomInput/CustomInput';
import FooterButton from '../../../../../Component/FooterButton/FooterButton';
import ImageUploadButton, {
  ImageSource,
} from '../../../../../Component/ImageUploadButton/ImageUploadButton';
import Modal from '../../../../../Component/Modal/Modal';
import { RequestModule } from '../../../../../../context/entities/request.model';
import WelcomeModal from '../../../../../Component/Modal/WelcomeModal';
import { useTranslation } from 'react-i18next';
import CustomKeyboardAvoidingView from '../../../../../Component/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';

interface UserProps {
  route: { params: any };
  files: File | undefined;
}

enum AddressType {
  From,
  To,
}

function UserRequest({ route }: UserProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const subCategory = route.params.item;
  const navigation = useNavigation<DashboardStackParamList>();
  const authState = authStore(state => state);
  const { dispatch: dispatchModal } = useContext(ModalContext);
  const [selectedImages, setSelectedImages] = useState<ImageSource[]>([]);
  const [requestValue, setRequestValue] = useState<any>({
    user_id: authState.auth ? authState.auth.user.id : undefined,
    name: authState.auth ? authState.auth.user.name : '',
    status_code: 1,
    sub_category_id: subCategory.id,
  });
  const { t } = useTranslation();

  const [addressType, setAddressType] = useState<AddressType>(AddressType.From);
  const form = useForm();

  const [toAddress, setToAddress] = useState<RequestModule.RequestAdditional>();
  const [fromAddress, setFromAddress] =
    useState<RequestModule.RequestAdditional>();

  const handleInputChange = (
    fieldName: keyof typeof requestValue,
    value: any,
  ) => {
    setRequestValue({ ...requestValue, [fieldName]: value });
  };

  const handleImageSelection = (images: ImageSource[]) => {
    setSelectedImages(images);
  };
  const submit = () => {
    if (authState.authenticated) {
      const data = new FormData();

      selectedImages.forEach((image: ImageSource) => {
        if (image.uri !== undefined) {
          data.append('files[]', {
            uri: image.uri!,
            name: image.name,
            type: image.type,
          });
        }
      });

      data.append('is_app', true);
      data.append('user_id', requestValue.user_id);
      data.append('name', requestValue.name);
      data.append('status_code', requestValue.status_code);
      data.append('sub_category_id', requestValue.sub_category_id);
      data.append('request_date', requestValue.request_date);
      data.append('details', requestValue.details);

      data.append('additional[].name', fromAddress?.name);
      data.append('additional[].latitude', fromAddress?.latitude);
      data.append('additional[].longitude', fromAddress?.longitude);
      data.append('additional[].address', fromAddress?.address);

      data.append('additional[].name', toAddress?.name);
      data.append('additional[].latitude', toAddress?.latitude);
      data.append('additional[].longitude', toAddress?.longitude);
      data.append('additional[].address', toAddress?.address);

      requestsService.createRequest(data).then(
        (res: any) => {
          console.log(res);

          dispatchModal({
            type: actions.SHOW,
            component: (
              <WelcomeModal
                title={''}
                subTitle={'Таны хүсэлт амжилттай бүртгэгдлээ'}
                onClick={() => {
                  dispatchModal({ type: actions.HIDE });
                  navigation.navigate('DashboardStack');
                }}
                buttonText="Болсон"
              />
            ),
          });

          navigation.navigate('DashboardStack');
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
                  color: Colors.textWhite,
                  fontSize: 20,
                  fontWeight: '800',
                  lineHeight: 30,
                }}>
                {subCategory.name}
              </Text>
              <Text
                style={{
                  color: Colors.textWhite,
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
                  uri: `${getEnv().IMAGE_URL}${subCategory.image_url}`,
                }}
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.textWhite,
              borderTopEndRadius: 16,
              borderTopStartRadius: 16,
            }}>
            <View
              style={{
                height: verticalScale(45),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: Colors.gray700,
                  fontSize: 18,
                  fontWeight: '700',
                  lineHeight: 27,
                }}>
                Хүсэлт үүсгэх
              </Text>
            </View>
            <ScrollView
              style={{ flex: 1, paddingHorizontal: horizontalScale(16) }}>
              <Text style={{ fontWeight: '500', lineHeight: 21 }}>
                Хүргэлт хийх өдөр сонгох
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
              <Text style={{ fontWeight: '500', lineHeight: 21 }}>
                Зураг оруулах
              </Text>
              <ImageUploadButton onImageSelection={handleImageSelection} />
              <Text style={{ fontWeight: '500', lineHeight: 21 }}>
                Дэлгэрэнгүй тайлбар
              </Text>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: horizontalScale(12),
                  marginVertical: verticalScale(16),
                  borderWidth: 1,
                  borderColor: Colors.borderColor,
                  borderRadius: 16,
                  height: 88,
                  paddingVertical: verticalScale(6),
                }}>
                <Text style={{ color: '#AFB3B7', lineHeight: 18 }}>
                  Дэлгэрэнгүй тайлбар
                </Text>
                <TextInput
                  value={requestValue?.details}
                  onChangeText={(value: string) =>
                    handleInputChange('details', value)
                  }
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    lineHeight: 24,
                    color: Colors.gray700,
                  }}
                  multiline={true}
                  numberOfLines={4}
                  placeholder="Дэлгэрэнгүй тайлбар оруулна уу."
                  returnKeyType="next"
                />
              </View>
              <Text style={[Typography.textSmallBold, { marginBottom: 8 }]}>
                Хаяг оруулах
              </Text>
              <FormProvider {...form}>
                <View
                  style={[AddressFormStyle.container, { marginBottom: 16 }]}>
                  <LocationCircleIcon style={AddressFormStyle.icon} />
                  <CustomInput
                    editable={false}
                    placeholder="Ачих газрыг оруулна уу."
                    name={'fromAddress'}
                    label={'Ачих газар'}
                  />
                  <Text
                    onPress={() => {
                      bottomSheetRef.current?.expand();
                      setAddressType(AddressType.From);
                    }}
                    style={[
                      Typography.textSmallBold,
                      { color: Colors.primaryColor, marginLeft: 8 },
                    ]}>
                    Засах
                  </Text>
                </View>
                <View style={AddressFormStyle.container}>
                  <LocationIcon style={AddressFormStyle.icon} />
                  <CustomInput
                    editable={false}
                    placeholder="Буулгах газрыг оруулна уу."
                    name={'toAddress'}
                    label={'Буулгах газар'}
                  />
                  <Text
                    onPress={() => {
                      bottomSheetRef.current?.expand();
                      setAddressType(AddressType.To);
                    }}
                    style={[
                      Typography.textSmallBold,
                      { color: Colors.primaryColor, marginLeft: 8 },
                    ]}>
                    Засах
                  </Text>
                </View>
              </FormProvider>

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
                      color: Colors.textWhite,
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
        <BottomSheet
          android_keyboardInputMode="adjustResize"
          handleIndicatorStyle={{ width: 100 }}
          index={-1}
          style={{
            shadowColor: '#000',
            shadowOffset: { width: -2, height: 5 },
            shadowOpacity: 0.5,
            shadowRadius: 8,
          }}
          ref={bottomSheetRef}
          enableDynamicSizing={true}
          maxDynamicContentSize={Dimensions.get('screen').height}
          enablePanDownToClose={true}>
          <CustomBottomSheet>
            <AddressBottomSheetView
              onSubmit={(response: Geocoder.GeocoderResponse) => {
                if (addressType === AddressType.From) {
                  form.setValue(
                    'fromAddress',
                    response.results[0].formatted_address,
                  );

                  setFromAddress({
                    address: response.results[0].formatted_address,
                    latitude: response.results[0].geometry.location.lat,
                    longitude: response.results[0].geometry.location.lng,
                    name: 'Ачих',
                  });
                } else {
                  form.setValue(
                    'toAddress',
                    response.results[0].formatted_address,
                  );

                  setToAddress({
                    address: response.results[0].formatted_address,
                    latitude: response.results[0].geometry.location.lat,
                    longitude: response.results[0].geometry.location.lng,
                    name: 'Буулгах',
                  });
                }
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
          </CustomBottomSheet>
        </BottomSheet>
      </LinearGradient>
    </CustomKeyboardAvoidingView>
  );
}

export default UserRequest;
