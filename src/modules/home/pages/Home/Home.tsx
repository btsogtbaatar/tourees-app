import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { defaultUrl } from '../../../../api';
import Banner from '../../../../components/Banner/Banner';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import { SearchMdIcon } from '../../../../components/Icon';
import ImageItem from '../../../../components/ImageItem/ImageItem';
import Loading from '../../../../components/Loading/Loading';
import { useAppDispatch } from '../../../../context/app/store';
import { colors } from '../../../../theme/colors';
import { resetAuth, selectAuthenticated } from '../../../Auth/slice/authSlice';
import { SharedModel } from '../../../Shared/entities/shared.model';
import { resetPreference } from '../../../Shared/slice/preferenceSlice';
import { getCategories as fetchCategories } from '../../services/category.service';
import HomeStyle from './Home.style';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<SharedModel.Category[]>();
  const navigation = useNavigation();
  const { t } = useTranslation(undefined, { keyPrefix: 'home' });
  const isAuthenticated = useSelector(selectAuthenticated);
  const dispatch = useAppDispatch();

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
    dispatch(resetAuth());
    dispatch(resetPreference());
    getCateories();
  }, []);

  const renderSeparator = () => <View style={HomeStyle.divider} />;

  return loading ? (
    <Loading />
  ) : (
    <CustomSafeAreaView>
      <ContainerView>
        <Text>{defaultUrl}</Text>
        <Text style={HomeStyle.title}>{t('category.question')}</Text>
        <View style={HomeStyle.inputContainer}>
          <CustomInput
            placeholder={t('category.search')}
            onPress={() => {
              navigation.navigate('SubCategoryList', {
                title: t('category.title'),
              });
            }}
            icon={<SearchMdIcon style={{ color: colors.primaryGradient }} />}
          />
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
        {!isAuthenticated && (
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
