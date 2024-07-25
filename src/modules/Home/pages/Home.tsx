import React, { useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import DashboardCard from '../../../components/DashboardCard/DashboardCard';
import RegisterComponent from '../../../components/DashboardCard/RegisterComponent';
import LoadingPage from '../../../components/Loading/LoadingPage';
import { colors } from '../../../constants/colors';
import { authStore } from '../../../context/auth/store';
import { verticalScale } from '../../../utilities/metrics';
import { SharedModel } from '../../shared/entities/shared.model';
import { getCategories as fetchCategories } from '../services/category.service';

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCatogories] = useState<SharedModel.Category[]>();
  const authState = authStore(state => state);

  const onRefresh = () => {
    setRefreshing(true);
    getCateories();
  };

  const getCateories = () => {
    fetchCategories()
      .then((response: SharedModel.Pagination<SharedModel.Category>) => {
        setCatogories(response.content);
        setLoading(false);
        setRefreshing(false);
      })
      .catch((_err: any) => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    getCateories();
  }, []);

  return loading ? (
    <LoadingPage />
  ) : (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingTop: 12,
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primaryColor}
            />
          }>
          {!authState.authenticated && <RegisterComponent />}
          <View style={{ marginTop: verticalScale(20) }}>
            <Text
              style={{ fontSize: 12, fontFamily: 'Nunito', fontWeight: '400' }}>
              Та ямар үйлчилгээ авах гэж байна вэ?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              <FlatList
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                numColumns={2}
                data={categories}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => {
                  return (
                    <DashboardCard
                      item={{
                        ...item,
                        title: item.name,
                        imageUrl: item.image?.url,
                      }}
                    />
                  );
                }}
                scrollEnabled={false}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;