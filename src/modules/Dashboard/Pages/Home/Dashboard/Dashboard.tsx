import { NavigationProp } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Colors } from '../../../../../../constants/Colors';
import { categoriesService } from '../../../../../api/services';
import { authStore } from '../../../../../context/auth/store';
import { ModalContext } from '../../../../../context/modal/modal.context';
import { actions as modalActions } from '../../../../../context/modal/modal.reducer';
import { DashboardStackParamList } from '../../../../../types/DashboardStackParamList';
import { verticalScale } from '../../../../../uitls/metrics';
import { CategoryModule } from '../../../../Auth/entities';
import DashboardCard from '../../../../Component/DashboardCard/DashboardCard';
import RegisterComponent from '../../../../Component/DashboardCard/RegisterComponent';
import LoadingPage from '../../../../Component/Loading/LoadingPage';
import Modal from '../../../../Component/Modal/Modal';

interface DashboardProps {
  navigation: NavigationProp<DashboardStackParamList>;
}
const Dashboard = ({ navigation }: DashboardProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCatogories] = useState<CategoryModule.Categories[]>();
  const authState = authStore(state => state);

  const onRefresh = () => {
    setRefreshing(true);
    getCateories();
  };

  const getCateories = () => {
    categoriesService.getCateories().then(
      (res: CategoryModule.Categories[]) => {
        setCatogories(res);
        setLoading(false);
        setRefreshing(false);
        console.log(res[0], 'category response');
      },
      (err: any) => {
        console.log('erroro', err);
      },
    );
  };

  useEffect(() => {
    console.log(authState.clientToken, 'authState, ClientToken');
    getCateories();
  }, []);

  const { dispatch: dispatchModal } = useContext(ModalContext);

  return false ? (
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
        <Button
          title="Modal show !"
          onPress={() => {
            dispatchModal({
              type: modalActions.SHOW,
              component: (
                <Modal
                  title="Сайн байна уу?"
                  text="Та Сийд платформд тавтай морил."
                  submitButtonText="Лог бичих"
                  onSubmit={() => {
                    console.log('Writing log as submitted.');
                  }}
                  dismissButtonText="Ойлголоо"
                />
              ),
            });
          }}></Button>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.primaryColor}
            />
          }>
          {!authState.authenticated && (
            <RegisterComponent navigation={navigation} />
          )}
          <View style={{ marginTop: verticalScale(20) }}>
            <Text
              style={{ fontSize: 12, fontFamily: 'Nunito', fontWeight: '400' }}>
              Та ямар үйлчилгээ авах гэж байна?
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
                  return <DashboardCard navigation={navigation} item={item} />;
                }}
              />
            </View>
          </View>
          <View style={{ marginTop: verticalScale(20) }}>
            <Text
              style={{ fontSize: 12, fontFamily: 'Nunito', fontWeight: '400' }}>
              Та юунд үйлчилгээ авхыг хүсэж байна?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              {/* <DashboardCard
                id={2}
                title="Цэвэрлэгээ"
                navigation={navigation}
                color="rgba(92, 177, 255, 0.20)"
                imageUrl={require('../../../../../assets/svg/dashboard/pngwing2.png')}
              />
              <DashboardCard id={2} title="Нүүлгэлт" navigation={navigation} /> */}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
