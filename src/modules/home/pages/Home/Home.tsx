import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FlatList, Text, View } from 'react-native';
import Banner from '../../../../components/Banner/Banner';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import { SearchMdIcon } from '../../../../components/Icon';
import ImageItem from '../../../../components/ImageItem/ImageItem';
import Loading from '../../../../components/Loading/Loading';
import { authStore } from '../../../../context/auth/store';
import { colors } from '../../../../theme/colors';
import { SharedModel } from '../../../Shared/entities/shared.model';
import { getCategories as fetchCategories } from '../../services/category.service';
import HomeStyle from './Home.style';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<SharedModel.Category[]>();
  const authState = authStore(state => state);
  const navigation = useNavigation();
  const { t } = useTranslation(undefined, { keyPrefix: 'home' });

  const getCateories = () => {
    fetchCategories()
      .then((response: SharedModel.Pagination<SharedModel.Category>) => {
        setCategories(response.content);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getCateories();
  }, []);

  const form = useForm({
    mode: 'onChange',
  });

  const renderSeparator = () => <View style={{ width: 16 }} />;

  return loading ? (
    <Loading />
  ) : (
    <CustomSafeAreaView>
      <ContainerView>
        <Text style={HomeStyle.title}>{t('category.question')}</Text>
        <View style={{ marginBottom: 8 }}>
          <FormProvider {...form}>
            <CustomInput
              name={'subCategoryName'}
              placeholder={t('category.search')}
              onPress={() => {
                navigation.navigate('SubCategoryList', {
                  title: t('category.title'),
                });
              }}
              icon={<SearchMdIcon style={{ color: colors.primary500 }} />}
            />
          </FormProvider>
        </View>
        <View style={HomeStyle.listContainer}>
          <FlatList
            horizontal={true}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            data={categories}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={renderSeparator}
            renderItem={({ item }) => (
              <ImageItem
                item={{
                  imageUrl: item.image?.url,
                  title: item.name,
                }}
                onPress={() =>
                  navigation.navigate('SubCategoryList', {
                    parentCategoryId: item.id,
                    title: item.name,
                  })
                }
              />
            )}
          />
        </View>
        {!authState.authenticated && (
          <Banner
            title={'Үйлчилгээ үзүүлэгчээр бүртгүүлэх'}
            onPress={() => navigation.navigate('Login')}
          />
        )}
      </ContainerView>
    </CustomSafeAreaView>
  );
};

export default Home;