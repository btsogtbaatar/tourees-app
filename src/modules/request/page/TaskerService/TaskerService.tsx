import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Controller, FieldError, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { BottomSheetMethods } from '@gorhom/bottom-sheet';
import { debounce } from 'lodash';
import * as yup from 'yup';
import Calendar from '../../../../components/Calendar/CalendarTasker';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomFormInput from '../../../../components/CustomInput/CustomFormInput';
import {
  DEFAULT_LAT,
  DEFAULT_LNG,
} from '../../../../components/CustomMapView/CustomMapView';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import { notifyMessage } from '../../../../components/CustomToast/CustomToast';
import FooterButton from '../../../../components/FooterButton/FooterButton';
import InputError from '../../../../components/FormError/FormError';
import { LocationCircleIcon } from '../../../../components/Icon/index';
import {
  MoonIcon,
  SunRiseIcon,
  SunSetIcon,
} from '../../../../components/Icon/index';
import ImageUploadButton from '../../../../components/ImageUploadButton/ImageUploadButton';
import TextItem from '../../../../components/TextItem/TextItem';
import { Address } from '../../../Shared/pages/AddressMapView/AddressMapView';
import { RootStackParamList } from '../../../../navigation/types';
import { colors } from '../../../../theme/colors';
import { TaskerServiceModel } from '../../entities/request.model';
import { SharedModel } from '../../../Shared/entities/shared.model';
import { uploadFile } from '../../../Shared/services/shared.service';
import { createTaskerService } from '../../service/tasker.service';
import { getCategories as fetchCategories } from '../../../Home/services/category.service';
import { getSubCategories } from '../../../Home/services/category.service';
import { TaskerServiceStyle } from './TaskerService.style';
import { Typography } from '../../../../theme/typography';
import CustomSelectionButton from '../../../../components/CustomButton/CustomSelectionButton';
import CustomSlider from '../../../../components/CustomSlider/CustomSlider';
import CategorySelector from './CategorySelector';
import SubCategorySelector from './SubCategorySelector';

type TaskerServiceProps = NativeStackScreenProps<
  RootStackParamList,
  'TaskerService'
>;

function TaskerService({ route }: Readonly<TaskerServiceProps>) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const rootNavigation = useNavigation();
  const [categories, setCategories] = useState<SharedModel.Category[]>();
  const [subCategories, setSubCategories] =
    useState<SharedModel.SubCategory[]>();

  const subCategorySheetRef = useRef<BottomSheetMethods>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(
    t('service.category.category'),
  );
  const [selectedSubCategoryName, setSelectedSubCategoryName] = useState(
    t('service.category.subCategory'),
  );

  const [address, setAddress] = useState<Address>({
    latitude: DEFAULT_LAT,
    longitude: DEFAULT_LNG,
  });
  const [items, setItems] = useState<{ label: string; value: number }[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [inPerson, setInPerson] = useState(false);

  const [isFlexible, setIsFlexible] = useState(false);
  const handleToggleFlexible = (isFlexible: boolean) => {
    setIsFlexible(isFlexible);
    console.log('Flexible:', isFlexible);
  };

  const [selectedTimeRange, setSelectedTimeRange] = useState(null);
  const handleTimeRange = value => {
    setSelectedTimeRange(value);
    console.log('Selected Time Range:', value);
  };

  const timeRanges = [
    {
      label: t('calendar.morning'),
      startHour: 8,
      endHour: 11,
      icon: <SunRiseIcon />,
    },
    {
      label: t('calendar.afternoon'),
      startHour: 12,
      endHour: 15,
      icon: <SunSetIcon />,
    },
    {
      label: t('calendar.evening'),
      startHour: 16,
      endHour: 22,
      icon: <MoonIcon />,
    },
  ];

  const taskerServiceSchema = yup.object().shape({
    name: yup
      .string()
      .required(t('service.validation.nameRequired'))
      .min(3, t('service.validation.nameMin')),
    tag: yup
      .string()
      .required(t('service.validation.tagRequired'))
      .min(2, t('service.validation.tagMin')),
    price: yup
      .number()
      .required(t('service.validation.priceRequired'))
      .positive(t('service.validation.pricePositive'))
      .typeError(t('service.validation.priceValid')),
    distance: yup.number().when('isInPerson', {
      is: true,
      then: yup
        .number()
        .required(t('service.validation.distanceRequired'))
        .positive(t('service.validation.distancePositive')),
    }),
    subCategory: yup.object({
      id: yup
        .number()
        .nullable()
        .required(t('service.validation.subCategoryRequired')),
    }),
    address: yup
      .object()
      .nullable()
      .when('isInPerson', {
        is: true,
        then: yup
          .object()
          .nullable(false)
          .required(t('service.validation.addressRequired')),
      }),
    files: yup
      .mixed<SharedModel.File>()
      .required(t('request.requestImageWarning')),
  });

  const getCategories = () => {
    fetchCategories()
      .then((response: SharedModel.Pagination<SharedModel.Category>) => {
        const categories = response.content.map(category => ({
          label: category.name,
          value: category.id,
        }));
        setItems(categories);
        setCategories(response.content);
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
    [filter, selectedCategory],
  );
  useEffect(() => {
    getCategories();
    if (selectedCategory !== null && filter) {
      console.log(selectedCategory, filter);

      debouncedSearch(selectedCategory, filter);
    }
    if (!inPerson) {
      form.setValue('distance', 0);
    }
  }, [filter, selectedCategory, inPerson]);

  const onSubmit = (taskerService: TaskerServiceModel) => {
    const payload = {
      ...taskerService,
      isInPerson: inPerson,
      isFlexible: isFlexible,
      timeRange: selectedTimeRange,
    };
    createTaskerService(payload).then(() => {
      notifyMessage(
        t('service.success.title'),
        t('service.success.message'),
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
    resolver: yupResolver(taskerServiceSchema),
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
              <Text style={TaskerServiceStyle.label}>{t('service.name')}</Text>
              <CustomFormInput placeholder={t('service.name')} name={'name'} />
              <Text style={TaskerServiceStyle.label}>{t('service.tag')}</Text>
              <CustomFormInput placeholder={t('service.tag')} name={'tag'} />
              <View>
                <Text style={TaskerServiceStyle.label}>
                  {t('request.requestDetail')}
                </Text>
                <CustomFormInput name={'description'} numberOfLines={3} />
              </View>
              <Text style={TaskerServiceStyle.label}>
                {t('service.price')} ₮
              </Text>
              <Controller
                name="price"
                render={({ field: { onChange, value } }) => (
                  <CustomFormInput
                    placeholder={t('service.price')}
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
                    name={'price'}
                  />
                )}
              />

              <View>
                <Text style={TaskerServiceStyle.label}>
                  {t('service.timeRange')}
                </Text>
                <Controller
                  name="timeRange"
                  render={({ field: { onChange } }) => (
                    <Calendar
                      onSuccess={handleTimeRange}
                      timeRanges={timeRanges}
                      locale="en"
                      showTodayButton={false}
                      showTomorrowButton={false}
                      showRangeButtons={true}
                      showdatePick={true}
                      showToggleBtn={true}
                      onToggleFlexible={handleToggleFlexible}
                    />
                  )}
                />
                {errors.timeRange && <InputError error={t('l_date')} />}
              </View>
              <View>
                <Text style={TaskerServiceStyle.label}>
                  {t('service.autoMsg')}
                </Text>
                <CustomFormInput name={'autoMsg'} numberOfLines={1} />
              </View>
              <View style={TaskerServiceStyle.locationContainer}>
                <View style={TaskerServiceStyle.locationSection}>
                  <View style={TaskerServiceStyle.locationRow}>
                    <CustomSelectionButton
                      style={TaskerServiceStyle.locationTypeButton}
                      active={!inPerson}
                      onPress={() => {
                        setInPerson(false);
                      }}>
                      <Text style={Typography.textSmall}>
                        {t('service.online')}
                      </Text>
                    </CustomSelectionButton>

                    <CustomSelectionButton
                      style={TaskerServiceStyle.locationTypeButton}
                      active={inPerson}
                      onPress={() => {
                        setInPerson(true);
                      }}>
                      <Text style={Typography.textSmall}>
                        {t('service.inPerson')}
                      </Text>
                    </CustomSelectionButton>
                  </View>

                  <Controller
                    name="address"
                    render={({ field: { onChange } }) => (
                      <TouchableOpacity
                        activeOpacity={!inPerson ? 0.7 : 1}
                        style={[
                          TaskerServiceStyle.touchable,
                          !inPerson && TaskerServiceStyle.disabled,
                        ]}
                        disabled={!inPerson}
                        onPress={() => {
                          if (inPerson) {
                            rootNavigation.navigate('AddressMapView', {
                              prevAddress: address,
                              title: t('form.address.label'),
                              onGoBack: (address: any) => {
                                const _address = { ...address };
                                _address.displayName = getAddress(_address);
                                setAddress(_address);
                                onChange(_address);
                              },
                            });
                          }
                        }}>
                        <TextItem
                          icon={<LocationCircleIcon width={20} height={20} />}
                          label={
                            address.displayName
                              ? address.displayName
                              : t('form.address.placeHolder')
                          }
                          buttonText={t('userRequest.address.edit')}
                        />
                      </TouchableOpacity>
                    )}
                  />
                  <View>
                    <Controller
                      name="distance"
                      control={form.control}
                      defaultValue={0}
                      render={({ field: { onChange, value } }) => (
                        <CustomSlider
                          minDistance={0}
                          maxDistance={101}
                          initialDistance={value}
                          step={5}
                          onChange={onChange}
                        />
                      )}
                    />
                    {!inPerson && (
                      <View style={TaskerServiceStyle.lockOverlay} />
                    )}
                  </View>

                  {form.formState.errors.address && (
                    <InputError error={form.formState.errors.address.message} />
                  )}
                </View>
              </View>

              <View>
                <Text style={TaskerServiceStyle.label}>
                  {t('request.requestImages')}
                </Text>
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
              <Text style={TaskerServiceStyle.label}>
                {t('service.category.label')}
              </Text>
              <CategorySelector
                control={form.control}
                categories={categories}
                selectedCategoryName={selectedCategoryName}
                setSelectedCategoryName={setSelectedCategoryName}
                setSelectedCategory={setSelectedCategory}
                fetchSubCategories={fetchSubCategories}
                filter={filter}
                subCategorySheetRef={subCategorySheetRef}
              />
              <Text style={TaskerServiceStyle.label}>
                {t('service.category.subCategory')}
              </Text>
              <SubCategorySelector
                control={form.control}
                subCategories={subCategories}
                selectedSubCategoryName={selectedSubCategoryName}
                setSelectedSubCategoryName={setSelectedSubCategoryName}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                filter={filter}
                setFilter={setFilter}
                debouncedSearch={debouncedSearch}
                selectedCategory={selectedCategory}
                subCategorySheetRef={subCategorySheetRef}
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
