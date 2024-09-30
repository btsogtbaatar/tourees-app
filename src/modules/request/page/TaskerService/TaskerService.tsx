import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Controller, FieldError, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  ScrollView,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector } from 'react-redux';
import { BottomSheetMethods } from '@gorhom/bottom-sheet';
import { debounce } from 'lodash';
import Calendar from '../../../../components/Calendar/CalendarTasker';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomImage from '../../../../components/CustomImage/CustomImage';
import CustomFormInput from '../../../../components/CustomInput/CustomFormInput';
import {
  DEFAULT_LAT,
  DEFAULT_LNG,
} from '../../../../components/CustomMapView/CustomMapView';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import { notifyMessage } from '../../../../components/CustomToast/CustomToast';
import CustomBottomScrollViewSheet from '../../../../components/CustomBottomSheetScrollView/CustomBottomSheetScrollView';
import { CustomBottomSheet } from '../../../../components/CustomBottomSheet/CustomBottomSheet';
import FooterButton from '../../../../components/FooterButton/FooterButton';
import InputError from '../../../../components/FormError/FormError';
import {
  LocationCircleIcon,
  LocationIcon,
  SearchMdIcon,
} from '../../../../components/Icon';
import ImageUploadButton from '../../../../components/ImageUploadButton/ImageUploadButton';
import TextItem from '../../../../components/TextItem/TextItem';
import { Address } from '../../../Shared/pages/AddressMapView/AddressMapView';
import { RootStackParamList } from '../../../../navigation/types';
import { colors } from '../../../../theme';
import { selectAuthenticated } from '../../../Auth/slice/authSlice';
import { TaskerServiceModel } from '../../entities/request.model';
import { SharedModel } from '../../../Shared/entities/shared.model';
import { uploadFile } from '../../../Shared/services/shared.service';
import { createTaskerService } from '../../service/tasker.service';
import { getCategories as fetchCategories } from '../../../Home/services/category.service';
import { getSubCategories } from '../../../Home/services/category.service';
import { TaskerServiceStyle } from './TaskerService.style';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import { Typography } from '../../../../theme/typography';
import CustomSelectionButton from '../../../../components/CustomButton/CustomSelectionButton';

type TaskerServiceProps = NativeStackScreenProps<
  RootStackParamList,
  'TaskerService'
>;

function TaskerService({ route }: Readonly<TaskerServiceProps>) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const rootNavigation = useNavigation();
  const isAuthenticated = useSelector(selectAuthenticated);

  const [categories, setCategories] = useState<SharedModel.Category[]>();
  const [subCategories, setSubCategories] =
    useState<SharedModel.SubCategory[]>();

  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const subCategorySheetRef = useRef<BottomSheetMethods>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null); // State for selected category
  const [selectedCategoryName, setSelectedCategoryName] =
    useState('Ангилал сонгох');
  const [selectedSubCategoryName, setSelectedSubCategoryName] =
    useState('Дэд ангилал сонгох');

  const [address, setAddress] = useState<Address>({
    latitude: DEFAULT_LAT,
    longitude: DEFAULT_LNG,
  });
  const [items, setItems] = useState<{ label: string; value: number }[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isOnline, setIsOnline] = useState(false);

  const getCategories = () => {
    fetchCategories()
      .then((response: SharedModel.Pagination<SharedModel.Category>) => {
        const categories = response.content.map(category => ({
          label: category.name,
          value: category.id,
        }));
        setItems(categories); // Set items for dropdown
        setCategories(response.content); // Update categories state for bottom sheet
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchSubCategories = (categoryId: number | null, query: string) => {
    if (categoryId !== null) {
      getSubCategories({ parentCategoryId: categoryId, name: query })
        .then((response: SharedModel.Pagination<SharedModel.SubCategory>) => {
          setSubCategories(response.content);
        })
        .catch((error: any) => {
          console.error('Error fetching subcategories:', error);
        });
    }
  };

  const debouncedSearch = useCallback(
    debounce((categoryId: number | null, query: string) => {
      fetchSubCategories(categoryId, query);
    }, 300),
    [],
  );
  useEffect(() => {
    getCategories();
  }, []);

  const onSubmit = (taskerService: TaskerServiceModel) => {
    createTaskerService(taskerService).then(() => {
      notifyMessage(
        t('Үйлчилгээ'),
        t('Таны оруулсан үйлчилгээ амжилттай бүртгэгдлээ.'),
        () => {
          rootNavigation.navigate('HomeTab', { screen: 'Home' });
        },
      );
    });
  };

  const form = useForm<TaskerServiceModel>({
    defaultValues: {
      subCategory: { id: null },
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const getAddress = (address: Address) => {
    const data = address.address!.split(', ');
    return `${data[data.length - 2]}, ${data[data.length - 1]}`;
  };

  return (
    <CustomSafeAreaView style={{ backgroundColor: colors.white, flex: 1 }}>
      <ScrollView
        contentContainerStyle={TaskerServiceStyle.scrollViewContainer}>
        <ContainerView>
          <FormProvider {...form}>
            <View style={TaskerServiceStyle.container}>
              <Text>{t('Үйлчилгээний нэр')}</Text>
              <CustomFormInput placeholder={t('Нэр')} name={'name'} />
              <Text>{t('Таг')}</Text>
              <CustomFormInput placeholder={t('Tag')} name={'tag'} />
              <Text>{t('Үйлчилгээний үнэ')}</Text>
              <Controller
                name="price"
                rules={{
                  required: 'Price is required',
                  pattern: {
                    value: /^[0-9]*\.?[0-9]+$/,
                    message: 'Enter a valid price',
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <CustomFormInput
                    placeholder="Мөнгөн дүн"
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
                    name={'price'}
                  />
                )}
              />

              <View>
                <Text>{t('Үйлчилгээ үзүүлэх хуваарь')}</Text>
                <Controller
                  name="timeRange"
                  render={({ field: { onChange } }) => (
                    <Calendar onSuccess={value => onChange(value)} />
                  )}
                />
                {errors.timeRange && (
                  <InputError error={'Өдөр, цагийг оруулна уу.'} />
                )}
              </View>
              <View style={TaskerServiceStyle.containerIsOnline}>









                <View style={TaskerServiceStyle.isOnlineSection}>
                  <View style={TaskerServiceStyle.isOnlineRow}>
                    <CustomSelectionButton
                      style={TaskerServiceStyle.categoryClickableText}
                      active={isOnline}
                      onPress={() => {
                        setIsOnline(true);
                      }}>
                      <Text style={Typography.textSmall}>{t('Онлайн')}</Text>
                    </CustomSelectionButton>

                    <CustomSelectionButton
                      style={TaskerServiceStyle.categoryClickableText}
                      active={!isOnline}
                      onPress={() => {
                        setIsOnline(false);
                      }}>
                      <Text style={Typography.textSmall}>{t('Хаягаар')}</Text>
                    </CustomSelectionButton>
                  </View>
                  <Controller
                    name="address"
                    render={({ field: { onChange } }) => (
                      <TextItem
                        icon={<LocationCircleIcon width={20} height={20} />}
                        label={
                          address.displayName
                            ? address.displayName
                            : t('form.address.placeHolder')
                        }
                        buttonText={t('userRequest.address.edit')}
                        onPress={() => {
                          rootNavigation.navigate('AddressMapView', {
                            prevAddress: address,
                            title: t('form.address.label'),
                            onGoBack: (address: any) => {
                              const _address = { ...address };
                              _address.displayName = getAddress(_address);
                              setAddress(_address);
                              console.log('result', address);
                              onChange(_address);
                            },
                          });
                        }}
                      />
                    )}
                  />
                  {form.formState.errors.address && (
                    <InputError error={form.formState.errors.address.message} />
                  )}
                </View>
              
              
              
              
              
              
              
              </View>








              
              <View>
                <Text>{t('request.requestImages')}</Text>
                <Controller
                  name="files"
                  render={({ field: { onChange, value } }) => (
                    <ImageUploadButton
                      limit={0}
                      onDelete={id => {
                        const _value = value.filter(
                          (_: any, index: number) => index !== id,
                        );
                        onChange([..._value]);
                      }}
                      onImageSelection={images => {
                        console.log('🚀 ~ images:', images);
                        images.forEach(image => {
                          uploadFile(image).then(file => {
                            if (value) {
                              onChange([...value, file]);
                            } else {
                              onChange([file]);
                            }
                          });
                        });
                      }}
                    />
                  )}
                />
                {errors.files && (
                  <InputError error={(errors.files as FieldError).message} />
                )}
              </View>
              <View>
                <Text>{t('request.requestDetail')}</Text>
                <CustomFormInput name={'description'} numberOfLines={3} />
              </View>
              <Text>{t('Ангилал сонгох')}</Text>
              <Controller
                name="category"
                render={({ field: { onChange, value } }) => (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        bottomSheetRef.current?.expand();
                        setSelectedSubCategoryName('');
                        setSelectedId(null);
                      }}>
                      <Text style={TaskerServiceStyle.categoryClickableText}>
                        {selectedCategoryName}{' '}
                      </Text>
                    </TouchableOpacity>

                    <CustomBottomSheet
                      ref={bottomSheetRef}
                      snapPoints={['50%', '100%']}
                      enablePanDownToClose>
                      <CustomBottomScrollViewSheet
                        style={TaskerServiceStyle.bottomSheetContainer}>
                        <View style={TaskerServiceStyle.contentContainer}>
                          <ScrollView>
                            {categories?.map(category => (
                              <TouchableOpacity
                                key={category.id}
                                style={[
                                  TaskerServiceStyle.categoryItem,
                                  selectedCategory === category.id
                                    ? TaskerServiceStyle.categoryItemSelected
                                    : null,
                                ]}
                                onPress={() => {
                                  setSelectedCategoryName(category.name);
                                  // setSelectedCategory(category.id);
                                  // onChange(category.id);
                                  fetchSubCategories(category.id, filter);
                                  bottomSheetRef.current?.close();
                                  subCategorySheetRef.current?.expand();
                                }}>
                                <Text
                                  style={TaskerServiceStyle.categoryItemText}>
                                  {category.name}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </ScrollView>
                        </View>
                      </CustomBottomScrollViewSheet>
                    </CustomBottomSheet>
                  </>
                )}
              />
              <Text>{t('Дэд ангилал сонгох')}</Text>
              {/* Subcategory Selection */}
              <Controller
                name="subCategory"
                render={({ field: { onChange, value } }) => (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        subCategorySheetRef.current?.expand();
                      }}>
                      <Text style={TaskerServiceStyle.categoryClickableText}>
                        {selectedSubCategoryName}{' '}
                      </Text>
                    </TouchableOpacity>

                    <CustomBottomSheet
                      ref={subCategorySheetRef}
                      snapPoints={['50%', '100%']}
                      enablePanDownToClose>
                      <CustomBottomScrollViewSheet
                        style={TaskerServiceStyle.bottomSheetContainer}>
                        <View style={TaskerServiceStyle.contentContainer}>
                          <CustomInput
                            clearButton
                            placeholder={t('search.placeholder')}
                            icon={
                              <SearchMdIcon
                                style={{ color: colors.primaryGradient }}
                                height={20}
                              />
                            }
                            onChangeText={(text: string) => {
                              setFilter(text);
                              debouncedSearch(selectedCategory, text);
                            }}
                          />
                          <ScrollView>
                            {subCategories?.map(subCategory => (
                              <TouchableOpacity
                                key={subCategory.id}
                                style={[
                                  TaskerServiceStyle.categoryItem,
                                  selectedId === subCategory.id
                                    ? TaskerServiceStyle.categoryItemSelected
                                    : null,
                                ]}
                                onPress={() => {
                                  setSelectedSubCategoryName(subCategory.name);
                                  setSelectedId(subCategory.id);
                                  onChange({ id: subCategory.id });
                                  subCategorySheetRef.current?.close();
                                }}>
                                <Text
                                  style={TaskerServiceStyle.categoryItemText}>
                                  {subCategory.name}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </ScrollView>
                        </View>
                      </CustomBottomScrollViewSheet>
                    </CustomBottomSheet>
                  </>
                )}
              />
            </View>
          </FormProvider>
        </ContainerView>
        <FooterButton
          onPress={handleSubmit(onSubmit, (error: any) => console.log(error))}
          showBackButton={true}
        />
      </ScrollView>
    </CustomSafeAreaView>
  );
}

export default TaskerService;
