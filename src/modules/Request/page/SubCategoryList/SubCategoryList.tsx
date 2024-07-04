import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import LoadingPage from '../../../../components/Loading/LoadingPage';
import RequestsCard from '../../../../components/Requests/RequestsCard';
import { colors } from '../../../../constants/colors';
import { horizontalScale, verticalScale } from '../../../../utilities/metrics';
import { getSubCategories } from '../../../home/services/category.service';
import { SharedModel } from '../../../shared/entities/shared.model';
import { RequestStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RequestStackParamList, 'SubCategoryList'>;

const SubCategoryList = (props: Props) => {
  const { categoryId } = props.route.params;
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<SharedModel.Category[]>();
  const [refreshing, setRefreshing] = useState(false);

  const getSubCategory = () => {
    getSubCategories(categoryId).then(
      (response: SharedModel.Pagination<SharedModel.Category>) => {
        setCategories(response.content);
        setLoading(false);
        setRefreshing(false);
      },
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    getSubCategory();
  };

  useEffect(() => {
    getSubCategory();
  }, []);

  return loading ? (
    <LoadingPage />
  ) : (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            tintColor={colors.primaryColor}
            onRefresh={onRefresh}
          />
        }
        style={{
          paddingHorizontal: horizontalScale(16),
          paddingTop: verticalScale(12),
          flex: 1,
        }}>
        <FlatList
          data={categories}
          renderItem={({ item, index }) => {
            return <RequestsCard item={item} index={index} />;
          }}
          ItemSeparatorComponent={() => <View style={{ marginTop: 16 }} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubCategoryList;
