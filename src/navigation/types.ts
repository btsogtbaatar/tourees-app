import { NavigatorScreenParams } from '@react-navigation/native';
import { AuthStackParamList } from '../modules/auth/navigation/types';
import { HomeStackParamList } from '../modules/home/navigation/types';
import { RequestStackParamList } from '../modules/request/navigation/types';
import { Address } from '../modules/shared/page/MapViewAddress/AddressMapView';

export type BaseStackParamList = {
  navigate: (screen: string, route?: any) => void;
  goBack: () => void;
  canGoBack: () => boolean;
};

export type RootStackParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  RequestStack: NavigatorScreenParams<RequestStackParamList>;
  AddressMapView: { address: Address; onGoBack: (address: Address) => void };
} & BaseStackParamList;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
