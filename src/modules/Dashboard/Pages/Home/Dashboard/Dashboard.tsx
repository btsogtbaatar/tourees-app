import { NavigationProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../../../../../constants/Colors';
import { categoriesService } from '../../../../../api/services';
import { VectorIcon } from '../../../../../assets/svg';
import { DashboardStackParamList } from '../../../../../types/DashboardStackParamList';
import { horizontalScale, verticalScale } from '../../../../../uitls/metrics';
import { CategoryModule } from '../../../../Auth/entities';
import DashboardCard from '../../../../Component/DashboardCard/DashboardCard';
import LoadingPage from '../../../../Component/Loading/LoadingPage';
import { authStore } from '../../../../../context/auth/store';
import RegisterComponent from '../../../../Component/DashboardCard/RegisterComponent';

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
    getCateories('name');
    // // authState.clearAccessToken();
    // authState.clearClientToken();
    // authState.setAuthentication(true);
  };

  const getCateories = (value: string) => {
    categoriesService.getCateories(value).then(
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
    getCateories('test');
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
                  return (
                    <DashboardCard
                      id={item.id}
                      title={item.code}
                      navigation={navigation}
                    />
                  );
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
              <DashboardCard
                id={2}
                title="Цэвэрлэгээ"
                navigation={navigation}
                color="rgba(92, 177, 255, 0.20)"
                imageUrl={require('../../../../../assets/svg/dashboard/pngwing2.png')}
              />
              <DashboardCard id={2} title="Нүүлгэлт" navigation={navigation} />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
