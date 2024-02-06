import React, { useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  horizontalScale,
  verticalScale,
} from '../../../../../../uitls/metrics';
import RequestsCard from '../../../../../Component/Requests/RequestsCard';
import { NavigationProp } from '@react-navigation/native';
import { DashboardStackParamList } from '../../../../../../types/DashboardStackParamList';
import LoadingPage from '../../../../../Component/Loading/LoadingPage';
import { categoriesService } from '../../../../../../api/services';
import { CategoryModule } from '../../../../../Auth/entities';
import { Colors } from '../../../../../../../constants/Colors';

interface Props {
  route: { params: { requestId: number } };
  navigation: NavigationProp<DashboardStackParamList>;
}

const Requests = (props: Props) => {
  const { requestId } = props.route.params;
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<CategoryModule.Category[]>();
  const [refreshing, setRefreshing] = useState(false);
  console.log(requestId, 'requestId');

  const getSubCategory = () => {
    categoriesService
      .getCateory(requestId)
      .then((res: CategoryModule.Category[]) => {
        setCategories(res);
        setLoading(false);
        setRefreshing(false);
      });
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
            tintColor={Colors.primaryColor}
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
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Requests;
