import moment from 'moment';
import React, { useContext, useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../../../../../../constants/Colors';
import { LocationCircleIcon, LocationIcon } from '../../../../../../assets/svg';
import {
  horizontalScale,
  verticalScale,
} from '../../../../../../uitls/metrics';
import Calendar from '../../../../../Component/Calendar/Calendar';
import ImageUploadButton, {
  ImageSource,
} from '../../../../../Component/ImageUploadButton/ImageUploadButton';
import { useNavigation } from '@react-navigation/native';
import { DashboardStackParamList } from '../../../../../../types/DashboardStackParamList';
import { authStore } from '../../../../../../context/auth/store';
import { ModalContext } from '../../../../../../context/modal/modal.context';
import {
  actions as ModalActions,
  initialState,
} from '../../../../../../context/modal/modal.reducer';
import Modal from '../../../../../Component/Modal/Modal';
import { RequestModule } from '../../../../../../context/entities/request.model';
import { requestsService } from '../../../../../../api/services/index';
import { CategoryModule } from '../../../../../Auth/entities/category.model';
import { actions } from '../../../../../../context/modal/modal.reducer';
import { getEnv } from '../../../../../../api';

interface UserProps {
  route: { params: any };
  files: File | undefined;
}

function UserRequest({ route }: UserProps) {
  const subCategory = route.params.item;
  const navigation = useNavigation<DashboardStackParamList>();
  const authState = authStore(state => state);
  const { dispatch: dispatchModal } = useContext(ModalContext);
  const [requestValue, setRequestValue] = useState<RequestModule.Request>({
    user_id: authState.auth.user.id,
    name: authState.auth.user.name,
    status_code: 1,
    sub_category_id: subCategory.id,
  });

  // const handleDate = (startDate: string) => {
  //   setRequestValue({ ...requestValue, ["request_date"]: startDate });
  // }

  const handleInputChange = (
    fieldName: keyof RequestModule.Request,
    value: any,
  ) => {
    if (fieldName === 'files') {
      const imageFile = value;
      setRequestValue({ ...requestValue, [fieldName]: imageFile });
      console.log(imageFile);
    } else {
      setRequestValue({ ...requestValue, [fieldName]: value });
    }
  };

  const submit = () => {
    if (authState.authenticated) {
      const data = new FormData();
      data.append('files', requestValue.files as unknown as File);
      data.append('user_id', requestValue.user_id);
      data.append('name', requestValue.name);
      data.append('status_code', requestValue.status_code);
      data.append('sub_category_id', requestValue.sub_category_id);
      data.append('request_date', requestValue.request_date);
      data.append('details', requestValue.details);

      requestsService.createRequest(requestValue).then(
        (res: any) => {
          console.log(res);

          dispatchModal({
            type: ModalActions.SHOW,
            component: <Modal title="Success" />,
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
        screen: 'SignUp',
      });
    }
  };

  return (
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
                color: Colors.textHeader,
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
            <ImageUploadButton
              onImageSelection={(value: ImageSource[]) =>
                handleInputChange('files', value)
              }
            />
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
                  color: Colors.textHeader,
                }}
                multiline={true}
                numberOfLines={4}
                placeholder="test oruulna uu"
                returnKeyType="next"
              />
            </View>
            <Text style={{ fontWeight: '500', lineHeight: 21 }}>
              Хаяг оруулах
            </Text>
            <View style={{ marginVertical: verticalScale(16) }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: verticalScale(52),
                }}>
                <LocationCircleIcon />
                <View
                  style={{
                    borderWidth: 1,
                    flex: 1,
                    marginLeft: horizontalScale(8),
                    borderColor: Colors.borderColor,
                    paddingHorizontal: horizontalScale(12),
                    borderRadius: 16,
                    height: '100%',
                    justifyContent: 'space-around',
                  }}>
                  <Text
                    style={{ color: '#878D93', fontSize: 12, lineHeight: 18 }}>
                    Ачих газар
                  </Text>
                  <Text>Ачих газар</Text>
                </View>
              </View>
            </View>
            <View style={{ marginBottom: verticalScale(16) }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: verticalScale(52),
                }}>
                <LocationIcon />
                <View
                  style={{
                    borderWidth: 1,
                    flex: 1,
                    marginLeft: horizontalScale(8),
                    borderColor: Colors.borderColor,
                    paddingHorizontal: horizontalScale(12),
                    borderRadius: 16,
                    height: '100%',
                    justifyContent: 'space-around',
                  }}>
                  <Text
                    style={{ color: '#878D93', fontSize: 12, lineHeight: 18 }}>
                    Буулгах газар
                  </Text>
                  <Text>Ачих газар</Text>
                </View>
              </View>
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
    </LinearGradient>
  );
}

export default UserRequest;
