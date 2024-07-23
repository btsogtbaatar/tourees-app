import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SearchMd } from '../../../assets/svg';
import CustomInput from '../../../components/CustomInput/CustomInput';
import DashboardCard from '../../../components/DashboardCard/DashboardCard';
import RegisterComponent from '../../../components/DashboardCard/RegisterComponent';
import LoadingPage from '../../../components/Loading/LoadingPage';
import { colors } from '../../../constants/colors';
import { authStore } from '../../../context/auth/store';
import { SharedModel } from '../../shared/entities/shared.model';
import { getCategories as fetchCategories } from '../services/category.service';

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCatogories] = useState<SharedModel.Category[]>();
  const authState = authStore(state => state);
  const rootNavigation = useNavigation();

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

  const form = useForm({
    mode: 'onChange',
  });

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
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Nunito',
              fontWeight: '400',
              marginBottom: 10,
            }}>
            Та ямар үйлчилгээ авахыг хүсч байна вэ?
          </Text>
          <View style={{ marginBottom: 10 }}>
            <FormProvider {...form}>
              <CustomInput
                name={'subCategoryName'}
                placeholder="Хайх"
                onPress={() => {
                  rootNavigation.navigate('RequestStack', {
                    screen: 'SubCategoryList',
                    params: {
                      title: 'Төрлүүд',
                    },
                  });
                }}
                icon={<SearchMd style={{ color: colors.primaryColor }} />}
              />
            </FormProvider>
          </View>
          {!authState.authenticated && (
            <RegisterComponent navigation={rootNavigation} />
          )}
          <View>
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
                      onPress={() => {
                        rootNavigation.navigate('RequestStack', {
                          screen: 'SubCategoryList',
                          params: {
                            parentCategoryId: item.id,
                            title: item.name,
                          },
                        });
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
