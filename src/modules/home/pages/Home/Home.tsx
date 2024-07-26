import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SearchMd } from '../../../../assets/svg';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import RegisterComponent from '../../../../components/DashboardCard/RegisterComponent';
import ImageItem from '../../../../components/ImageItem/ImageItem';
import LoadingPage from '../../../../components/Loading/LoadingPage';
import { colors } from '../../../../constants/colors';
import { authStore } from '../../../../context/auth/store';
import { SharedModel } from '../../../Shared/entities/shared.model';
import { getCategories as fetchCategories } from '../../services/category.service';
import HomeStyle from './Home.style';

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCatogories] = useState<SharedModel.Category[]>();
  const authState = authStore(state => state);
  const rootNavigation = useNavigation();
  const { t } = useTranslation(undefined, { keyPrefix: 'home' });

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

  const renderSeparator = () => <View style={{ width: 15 }} />;

  return loading ? (
    <LoadingPage />
  ) : (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={HomeStyle.container}>
        <Text style={HomeStyle.title}>{t('category.question')}</Text>
        <View style={{ marginBottom: 10 }}>
          <FormProvider {...form}>
            <CustomInput
              name={'subCategoryName'}
              placeholder={t('category.search')}
              onPress={() => {
                rootNavigation.navigate('RequestStack', {
                  screen: 'SubCategoryList',
                  params: {
                    title: t('category.title'),
                  },
                });
              }}
              icon={<SearchMd style={{ color: colors.primaryColor }} />}
            />
          </FormProvider>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primaryColor}
            />
          }>
          {!authState.authenticated && (
            <RegisterComponent
              onPress={() =>
                rootNavigation.navigate('AuthStack', { screen: 'Login' })
              }
            />
          )}
          <View style={HomeStyle.listContainer}>
            <FlatList
              horizontal
              contentContainerStyle={{ marginBottom: 15 }}
              data={categories}
              keyExtractor={item => item.id.toString()}
              ItemSeparatorComponent={renderSeparator}
              renderItem={({ item }) => {
                return (
                  <ImageItem
                    item={{
                      imageUrl: item.image?.url,
                      title: item.name,
                    }}
                    onPress={() =>
                      rootNavigation.navigate('RequestStack', {
                        screen: 'SubCategoryList',
                        params: {
                          parentCategoryId: item.id,
                          title: item.name,
                        },
                      })
                    }
                  />
                );
              }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
