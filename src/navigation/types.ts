import { NavigatorScreenParams } from '@react-navigation/native';
import { AuthStackParamList } from '../modules/Auth/navigation/types';
import { HomeStackParamList } from '../modules/Home/navigation/types';
import { AddressType } from '../modules/Request/entities/request.model';
import { RequestStackParamList } from '../modules/Request/navigation/types';
import { Addresses } from '../modules/Shared/page/MapViewAddress/AddressMapView';

export type RootStackParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  RequestStack: NavigatorScreenParams<RequestStackParamList>;
  AddressMapView: {
    addresses: Addresses;
    addressType: AddressType;
    onGoBack: (addresses: Addresses) => void;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
