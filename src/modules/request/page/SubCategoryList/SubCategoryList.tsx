import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl, ScrollView, View } from 'react-native';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomFlatListItem from '../../../../components/CustomFlatListItem/CustomFlatListItem';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import { SearchMdIcon } from '../../../../components/Icon';
import Loading from '../../../../components/Loading/Loading';
import { RootStackParamList } from '../../../../navigation/types';
import { colors } from '../../../../theme/colors';
import { getSubCategories as fetchSubCategories } from '../../../Home/services/category.service';
import { SharedModel } from '../../../Shared/entities/shared.model';
import SubCategoryListStyle from './SubCategoryList.style';

type Props = NativeStackScreenProps<RootStackParamList, 'SubCategoryList'>;

const SubCategoryList = (props: Props) => {
  const { parentCategoryId } = props.route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<SharedModel.SubCategory[]>();
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<SharedModel.SubCategoryFilter>({
    parentCategoryId,
  });
  const form = useForm({
    mode: 'onChange',
  });
  const { t } = useTranslation(undefined, { keyPrefix: 'subCategoryList' });

  const getSubCategories = (_filter: SharedModel.SubCategoryFilter) => {
    setFilter(_filter);

    fetchSubCategories(_filter).then(
      (response: SharedModel.Pagination<SharedModel.SubCategory>) => {
        setCategories(response.content);
        setLoading(false);
        setRefreshing(false);
      },
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    getSubCategories(filter);
  };

  useEffect(() => {
    getSubCategories(filter);
  }, []);

  const handler = useCallback(debounce(getSubCategories, 500), []);

  const onPress = (item: SharedModel.SubCategory) => {
    navigation.navigate('UserRequest', { item });
  };

  return loading ? (
    <Loading />
  ) : (
    <ContainerView>
      <View style={SubCategoryListStyle.formContainer}>
        <FormProvider {...form}>
          <CustomInput
            clearButton
            placeholder={t('search.placeholder')}
            icon={
              <SearchMdIcon style={{ color: colors.primary500 }} height={20} />
            }
            onChangeText={(text: string) => {
              handler({ ...filter, name: text });
            }}
          />
        </FormProvider>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            tintColor={colors.primary500}
            onRefresh={onRefresh}
          />
        }>
        <FlatList
          scrollEnabled={false}
          data={categories}
          renderItem={({ item }) => {
            return (
              <CustomFlatListItem
                title={item.name}
                subtitle={item.description ?? t('subtitle.placeholder')}
                imageUrl={item.image.url}
                onPress={() => onPress(item)}
              />
            );
          }}
          ItemSeparatorComponent={() => <View style={{ marginBottom: 16 }} />}
        />
      </ScrollView>
    </ContainerView>
  );
};

export default SubCategoryList;
