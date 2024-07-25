import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import { SearchMd } from '../../../../assets/svg';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import LoadingPage from '../../../../components/Loading/LoadingPage';
import RequestsCard from '../../../../components/Requests/RequestsCard';
import { colors } from '../../../../constants/colors';
import { getSubCategories as fetchSubCategories } from '../../../home/services/category.service';
import { SharedModel } from '../../../shared/entities/shared.model';
import { RequestStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RequestStackParamList, 'SubCategoryList'>;

const SubCategoryList = (props: Props) => {
  const { parentCategoryId } = props.route.params;
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<SharedModel.Category[]>();
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<SharedModel.SubCategoryFilter>({
    parentCategoryId,
  });
  const form = useForm({
    mode: 'onChange',
  });

  const getSubCategories = (filter: SharedModel.SubCategoryFilter) => {
    setFilter(filter);

    fetchSubCategories(filter).then(
      (response: SharedModel.Pagination<SharedModel.Category>) => {
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

  return loading ? (
    <LoadingPage />
  ) : (
    <SafeAreaView style={{ flex: 1 }}>
      <ContainerView>
        <View style={{ marginBottom: 10 }}>
          <FormProvider {...form}>
            <CustomInput
              name={'subCategoryName'}
              placeholder="Хайх"
              icon={<SearchMd style={{ color: colors.primaryColor }} />}
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
              tintColor={colors.primaryColor}
              onRefresh={onRefresh}
            />
          }>
          <FlatList
            scrollEnabled={false}
            data={categories}
            renderItem={({ item, index }) => {
              return <RequestsCard item={item} index={index} />;
            }}
            ItemSeparatorComponent={() => <View style={{ marginBottom: 16 }} />}
          />
        </ScrollView>
      </ContainerView>
    </SafeAreaView>
  );
};

export default SubCategoryList;
