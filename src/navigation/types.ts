import { NavigatorScreenParams } from '@react-navigation/native';
import { AuthModel } from '../modules/Auth/entities';
import { HomeStackParamList as HomeTabParamList } from '../modules/Home/navigation/types';
import { AddressType } from '../modules/Request/entities/request.model';
import {
  FormField,
  SharedModel,
} from '../modules/Shared/entities/shared.model';
import { Addresses } from '../modules/Shared/pages/AddressMapView/AddressesMapView';
import { Address } from '../modules/Shared/pages/AddressMapView/AddressesMapView';
import { Schema } from '../modules/Profile/model/registration.model';

export type RootStackParamList = {
  HomeTab: NavigatorScreenParams<HomeTabParamList>;
  Login: undefined;
  LoginOtpCheck: { credentials: AuthModel.Credentials };
  Register: undefined;
  RegisterTermAndCondition: undefined;
  RegistrationInformation: undefined;
  RegisterOtpCheck: { registration: AuthModel.RegisterResponse };
  SubCategoryList: { parentCategoryId?: number; title: string };
  UserRequest: {
    item: SharedModel.SubCategory;
  };
  UpdateInformation: {
    field: FormField;
    defaultValues: Schema;
  };
  RequestDetail: {
    id: number;
    title: string;
    status?: string;
  };
  AddressesMapView: {
    addresses: Addresses;
    addressType: AddressType;
    onGoBack: (addresses: Addresses) => void;
  };
  AddressMapView: {
    prevAddress: Address;
    title: string;
    onGoBack: (addresses: Address) => void;
  };
  AddressesDetail: {
    addresses: Addresses;
    onGoBack: (addresses: Addresses) => void;
  };
  BiometricConsent: undefined;
  CreatePin: undefined;
  RetypePin: { pin: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
