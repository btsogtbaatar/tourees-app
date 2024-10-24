import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, SectionList, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Banner from '../../../../components/Banner/Banner';
import ContainerView from '../../../../components/ContainerView/ContainerView';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import CustomSafeAreaView from '../../../../components/CustomSafeAreaView/CustomSafeAreaView';
import { SearchMdIcon } from '../../../../components/Icon';
import ImageItem from '../../../../components/ImageItem/ImageItem';
import Loading from '../../../../components/Loading/Loading';
import TaskerServiceList from '../../../../components/TaskerServiceList/TaskerServiceList';
import { useAppDispatch } from '../../../../context/app/store';
import { useTaskerServiceFetch } from '../../../../hooks/useTaskerServiceFetch';
import { colors } from '../../../../theme/colors';
import { updateFirebaseToken } from '../../../Auth/services';
import {
  selectAuthenticated,
  selectFirebaseToken,
} from '../../../Auth/slice/authSlice';
import { getUnreadNotificationCount } from '../../../Notification/services/notification.service';
import { setUnreadNotificationCount } from '../../../Notification/slice/notificationSlice';
import { SharedModel } from '../../../Shared/entities/shared.model';
import { getCategories as fetchCategories } from '../../services/category.service';
import HomeStyle from './Home.style';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<SharedModel.Category[]>();
  const navigation = useNavigation();
  const { t } = useTranslation(undefined, { keyPrefix: 'home' });
  const isAuthenticated = useSelector(selectAuthenticated);
  const dispatch = useAppDispatch();
  const firebaseToken = useSelector(selectFirebaseToken);

  useEffect(() => {
    if (firebaseToken !== undefined && isAuthenticated === true) {
      updateFirebaseToken(firebaseToken);
    }
  }, [firebaseToken, isAuthenticated]);
  const { filteredGroupedTaskService } = useTaskerServiceFetch();

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

    if (isAuthenticated) {
      getUnreadNotificationCount().then(res => {
        dispatch(setUnreadNotificationCount(res));
      });
    }
  }, []);

  const renderSeparator = () => <View style={HomeStyle.divider} />;

  return loading ? (
    <Loading />
  ) : (
    <CustomSafeAreaView>
      <ContainerView>
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
            key={0}
            title={t('loginAsContractor')}
            onPress={() => navigation.navigate('Login')}
          />
        )}
        {!isAuthenticated && (
          <View style={{ marginTop: 5 }}>
            <Banner
              key={1}
              title={t('signUpAsContractor')}
              onPress={() => navigation.navigate('Register')}
            />
          </View>
        )}
        <View>
          {filteredGroupedTaskService && (
            <View style={HomeStyle.serviceSearchContainer}>
              <Text style={HomeStyle.title}>{t('services.question')}</Text>
              <View style={{ width: '40%' }}>
                <CustomInput
                  placeholder={t('services.search')}
                  onPress={() => {
                    navigation.navigate('TaskerServiceSearch', {});
                  }}
                  icon={
                    <SearchMdIcon style={{ color: colors.primaryGradient }} />
                  }
                />
              </View>
            </View>
          )}
          <SectionList
            sections={filteredGroupedTaskService}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item.name + index}
            renderItem={({ section, index }) => {
              return index < 1 ? (
                <TaskerServiceList
                  title={section.title}
                  services={section.data}
                />
              ) : null;
            }}
            contentContainerStyle={HomeStyle.listContentContainer}
          />
        </View>
      </ContainerView>
    </CustomSafeAreaView>
  );
};

export default Home;
