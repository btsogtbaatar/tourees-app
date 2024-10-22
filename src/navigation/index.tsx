import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Photos } from '../components/Photos/Photos';
import RemarkListView from '../components/RemarkListView/RemarkListView';
import BiometricConsent from '../modules/Auth/pages/BiometricConsent/BiometricConsent';
import CreatePin from '../modules/Auth/pages/CreatePin/CreatePin';
import EnterPin from '../modules/Auth/pages/EnterPin/EnterPin';
import Login from '../modules/Auth/pages/Login/Login';
import LoginOtpCheck from '../modules/Auth/pages/LoginOtpCheck/LoginOtpCheck';
import Register from '../modules/Auth/pages/Register/Register';
import RegisterOtpCheck from '../modules/Auth/pages/RegisterOtpCheck/RegisterOtpCheck';
import RegisterTermAndCondition from '../modules/Auth/pages/RegisterTermAndCondition/RegisterTermAndCondition';
import RetypePin from '../modules/Auth/pages/RetypePin/RetypePin';
import HomeTabNavigator from '../modules/Home/navigation';
import TaskerServiceSearch from '../modules/Home/pages/TaskerServiceSearch/TaskerServiceSearch';
import BiometricConfig from '../modules/Profile/pages/Biometric/BiometricConfig';
import RegistrationInformation from '../modules/Profile/pages/RegistrationInformation/RegistrationInformation';
import UpdateInformation from '../modules/Profile/pages/UpdateInformation/UpdateInformation';
import VisitProfile from '../modules/Profile/pages/VisitProfile/VisitProfile';
import Chat from '../modules/Request/page/Chat/Chat';
import CreateOffer from '../modules/Request/page/Offer/CreateOffer';
import SubCategoryList from '../modules/Request/page/SubCategoryList/SubCategoryList';
import TaskBudget from '../modules/Request/page/TaskBudget/TaskBudget';
import TaskDetail from '../modules/Request/page/TaskDetail/TaskDetail';
import TaskerService from '../modules/Request/page/TaskerService/TaskerService';
import TaskerServiceView from '../modules/Request/page/TaskerServiceView/TaskerServiceView';
import TaskList from '../modules/Request/page/TaskList/TaskList';
import UserRequest from '../modules/Request/page/UserRequest/UserRequest';
import { useSocket } from '../modules/Shared/hooks';
import AddressesDetail from '../modules/Shared/pages/AddressDetail/AddressesDetail';
import AddressesMapView from '../modules/Shared/pages/AddressMapView/AddressesMapView';
import AddressMapView from '../modules/Shared/pages/AddressMapView/AddressMapView';
import RegisterTasker from '../modules/Tasker/page/RegisterProfile/RegisterProfile';
import TaskerView from '../modules/Tasker/page/TaskerView/TaskerView';
import customScreenOption from '../theme/customHeaderOption';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Route = () => {
  const { t } = useTranslation();
  const cleanup = useSocket();
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);
  return (
    <Stack.Navigator
      initialRouteName="HomeTab"
      screenOptions={customScreenOption}>
      <Stack.Group>
        <Stack.Screen
          options={{ title: t('headers.login') }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ title: t('headers.login') }}
          name="LoginOtpCheck"
          component={LoginOtpCheck}
        />
        <Stack.Screen
          options={{ title: t('headers.register') }}
          name="Register"
          component={Register}
        />
        <Stack.Screen
          options={{ title: t('headers.register') }}
          name="RegisterOtpCheck"
          component={RegisterOtpCheck}
        />
        <Stack.Screen
          options={{ title: t('headers.register') }}
          name="RegisterTermAndCondition"
          component={RegisterTermAndCondition}
        />
        <Stack.Screen
          options={{ title: t('headers.biometric') }}
          name="BiometricConsent"
          component={BiometricConsent}
        />
        <Stack.Screen
          options={{ title: t('headers.createPin') }}
          name="CreatePin"
          component={CreatePin}
        />
        <Stack.Screen
          options={{ title: t('headers.enterPin') }}
          name="EnterPin"
          component={EnterPin}
        />
        <Stack.Screen
          options={{ title: t('headers.retypePin') }}
          name="RetypePin"
          component={RetypePin}
        />
        <Stack.Screen
          options={{ title: t('headers.home') }}
          name="HomeTab"
          component={HomeTabNavigator}
        />
        <Stack.Screen
          options={{ title: t('headers.category') }}
          name="SubCategoryList"
          component={SubCategoryList}
        />
        <Stack.Screen
          options={{ title: t('headers.request') }}
          name="UserRequest"
          component={UserRequest}
        />
        <Stack.Screen
          options={{ title: t('headers.request') }}
          name="TaskDetail"
          component={TaskDetail}
        />
        <Stack.Screen
          options={{ title: t('headers.registrationInformation') }}
          name="RegistrationInformation"
          component={RegistrationInformation}
        />
        <Stack.Screen
          options={{ title: t('headers.request') }}
          name="TaskerService"
          component={TaskerService}
        />
        <Stack.Screen
          options={{ title: t('headers.myOfferTasks') }}
          name="MyOfferTasks"
          component={TaskList}
        />
        <Stack.Screen
          options={{ title: t('headers.editOffer') }}
          name="EditOffer"
          component={CreateOffer}
        />
        <Stack.Screen
          options={{ title: t('headers.biometricConfig') }}
          name="BiometricConfig"
          component={BiometricConfig}
        />
        <Stack.Screen
          options={{ title: t('headers.photos') }}
          name="Photos"
          component={Photos}
        />
        <Stack.Screen
          options={{ title: t('headers.taskBudget') }}
          name="TaskBudget"
          component={TaskBudget}
        />
        <Stack.Screen
          options={{ title: t('headers.createOffer') }}
          name="CreateOffer"
          component={CreateOffer}
        />
        <Stack.Screen
          options={{ title: t('headers.chat') }}
          name="Chat"
          component={Chat}
        />
        <Stack.Screen
          name="TaskerServiceView"
          component={TaskerServiceView}
          options={{ title: t('headers.listingDetail') }}
        />
        <Stack.Screen
          name="TaskerServiceSearch"
          component={TaskerServiceSearch}
          options={{ title: 'test' }}
        />
        <Stack.Screen
          name="RegisterTasker"
          component={RegisterTasker}
          options={{ title: t('headers.taskerProfile') }}
        />
        <Stack.Screen
          name="TaskerView"
          component={TaskerView}
          options={{ title: t('headers.taskerProfile') }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          options={{ title: t('headers.address') }}
          name="AddressesMapView"
          component={AddressesMapView}
        />
        <Stack.Screen
          options={{ title: t('headers.address') }}
          name="AddressMapView"
          component={AddressMapView}
        />
        <Stack.Screen
          options={{ title: t('headers.address') }}
          name="AddressesDetail"
          component={AddressesDetail}
        />
        <Stack.Screen
          options={{ title: t('headers.updateInformation') }}
          name="UpdateInformation"
          component={UpdateInformation}
        />
        <Stack.Screen
          options={{ title: t('headers.profile') }}
          name="VisitProfile"
          component={VisitProfile}
        />
        <Stack.Screen
          name="RemarkListView"
          component={RemarkListView}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default Route;
