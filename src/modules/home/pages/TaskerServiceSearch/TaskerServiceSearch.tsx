import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomCurrencyView from '../../../../components/CustomCurrencyView/CustomCurrencyView';
import CustomImage from '../../../../components/CustomImage/CustomImage';
import CustomInput, {
  CustomInputRef,
} from '../../../../components/CustomInput/CustomInput';
import {
  ChevronDownIcon,
  SearchMdIcon,
  XCircleIcon,
} from '../../../../components/Icon';
import Loading from '../../../../components/Loading/Loading';
import { useTaskerServiceFetch } from '../../../../hooks/useTaskerServiceFetch';
import { RootStackParamList } from '../../../../navigation/types';
import { colors } from '../../../../theme/colors';
import { verticalScale } from '../../../../utilities';
import { TaskerServiceSortType } from '../../../Shared/entities/shared.model';
import TaskerSearchStyles from './TaskerServiceSearch.style';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskerServiceSearch'>;

const TaskerServiceSearch = (props: Props) => {
  const { subCategoryId, subCategoryName } = props.route.params;

  const { taskerServices, onSubmitSearch, loading, onSubmitSort, sortValue } =
    useTaskerServiceFetch(subCategoryId);
  const [filterValue, setFilterValue] = useState<string>('');
  const form = useForm({
    mode: 'onChange',
  });
  const textInputRef = useRef<CustomInputRef>(null);
  const { t } = useTranslation();
  const navigation = useNavigation();

  const showShortAlert = () => {
    Alert.alert(
      t('service.sort.name'),
      '',
      [
        {
          text: t('service.sort.default'),
          onPress: () => onSubmitSearch(''),
        },
        {
          text: t('service.sort.priceLowToHigh'),
          onPress: () => onSubmitSort(TaskerServiceSortType.PRICE_LOW),
        },
        {
          text: t('service.sort.priceHighToLow'),
          onPress: () => onSubmitSort(TaskerServiceSortType.PRICE_HIGH),
        },
        {
          text: t('service.sort.cancel'),
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };

  const returnSortTitle = () => {
    switch (sortValue) {
      case TaskerServiceSortType.PRICE_LOW:
        return t('service.sort.priceLowToHigh');
      case TaskerServiceSortType.PRICE_HIGH:
        return t('service.sort.priceHighToLow');
      default:
        break;
    }
    return t('service.sort.name');
  };

  return loading ? (
    <Loading />
  ) : (
    <ContainerView>
      <FormProvider {...form}>
        <CustomInput
          value={filterValue}
          ref={textInputRef}
          placeholder={t('home.services.search')}
          icon={<SearchMdIcon color={colors.primaryGradient} height={20} />}
          onChangeText={(text: string) => {
            setFilterValue(text);
          }}
          onSubmitEditing={() => {
            onSubmitSearch(filterValue);
          }}
          action={{
            icon: <XCircleIcon color={colors.gray200} height={20} />,
            onPress() {
              textInputRef.current?.clear();
              setFilterValue('');
              onSubmitSearch('');
            },
          }}
        />
      </FormProvider>
      <View style={{ alignItems: 'flex-end', marginTop: verticalScale(12) }}>
        <TouchableOpacity
          onPress={() => showShortAlert()}
          style={[
            {
              backgroundColor: sortValue
                ? colors.primaryGradient
                : colors.gray100,
            },
            TaskerSearchStyles.sortContainer,
          ]}>
          <Text style={{ color: sortValue ? colors.white : colors.dark700 }}>
            {returnSortTitle()}
          </Text>
          <ChevronDownIcon width={16} />
        </TouchableOpacity>
      </View>
      {subCategoryId && (
        <View style={TaskerSearchStyles.subCategoryContainer}>
          <Text style={TaskerSearchStyles.subCategoryTitle}>
            {subCategoryName}
          </Text>
        </View>
      )}
      <View style={[TaskerSearchStyles.mTop8, TaskerSearchStyles.pBottom]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={taskerServices}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('TaskerServiceView', {
                    id: item.id,
                    title: item.name,
                  });
                }}>
                <View style={TaskerSearchStyles.serviceContainer}>
                  <View>
                    <Text style={TaskerSearchStyles.serviceNameTitle}>
                      {item.name}
                    </Text>
                    <CustomCurrencyView amount={item.price} />
                    {item.contractor && item.contractor.user && (
                      <View style={TaskerSearchStyles.nameContainer}>
                        <Text style={TaskerSearchStyles.nameTitle}>
                          {item.contractor.user.lastName &&
                            item.contractor.user.lastName
                              ?.charAt(0)
                              .toUpperCase() + '.'}
                          {item.contractor.user?.firstName}
                        </Text>
                        <Text style={TaskerSearchStyles.rateStyles}>
                          {t('service.status.new')}
                        </Text>
                      </View>
                    )}
                  </View>
                  {item.files && item.files[0] && (
                    <CustomImage
                      source={{ uri: item.files[0].url }}
                      width={120}
                      height={84}
                      style={TaskerSearchStyles.imageContainer}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
          ItemSeparatorComponent={() => (
            <View style={TaskerSearchStyles.mBottom16} />
          )}
        />
      </View>
    </ContainerView>
  );
};

export default TaskerServiceSearch;
