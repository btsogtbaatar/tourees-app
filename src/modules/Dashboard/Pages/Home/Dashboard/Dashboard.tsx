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

interface DashboardProps {
  navigation: NavigationProp<DashboardStackParamList>;
}
const Dashboard = ({ navigation }: DashboardProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCatogories] = useState<CategoryModule.Categories[]>();
  const onRefresh = () => {
    setRefreshing(true);
    getCateories('name');
  };

  const getCateories = (value: string) => {
    categoriesService.getCateories(value).then(
      (res: CategoryModule.Categories[]) => {
        setCatogories(res);
        setLoading(false);
        setRefreshing(false);
      },
      (err: any) => {
        console.log('erroro', err);
      },
    );
  };

  useEffect(() => {
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
          <LinearGradient
            colors={['#37414B', '#161A1E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0, 1]}
            style={{
              paddingTop: verticalScale(12),
              paddingBottom: verticalScale(16),
              paddingHorizontal: horizontalScale(16),
              borderRadius: horizontalScale(16),
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: horizontalScale(240),
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: 8,
              }}>
              <Text
                style={{
                  color: Colors.textWhite,
                  fontSize: 16,
                  fontWeight: '500',
                  lineHeight: 24,
                }}>
                Хэрвээ та үйлчилгээ үзүүлэгч бол бидэнтэй нэгдээрэй!
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AuthStack', {
                    screen: 'SignUp',
                  })
                }
                style={{
                  height: verticalScale(32),
                  paddingHorizontal: horizontalScale(12),
                  justifyContent: 'center',
                  backgroundColor: Colors.textWhite,
                  borderRadius: horizontalScale(12),
                  gap: 4,
                }}>
                <Text>Бүртгүүлэх</Text>
              </TouchableOpacity>
            </View>
            <View>
              <VectorIcon />
            </View>
          </LinearGradient>
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
