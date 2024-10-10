import { NavigatorScreenParams } from '@react-navigation/native';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import { AuthModel } from '../modules/Auth/entities';
import { HomeStackParamList as HomeTabParamList } from '../modules/Home/navigation/types';
import { Schema } from '../modules/Profile/model/registration.model';
import {
  AddressType,
  TaskModel,
} from '../modules/Request/entities/request.model';
import {
  FormField,
  SharedModel,
} from '../modules/Shared/entities/shared.model';
import {
  Address,
  Addresses,
} from '../modules/Shared/pages/AddressMapView/AddressesMapView';
import { ProfileModel } from '../modules/Tasker/entities/profile.model';

export type RootStackParamList = {
  HomeTab: NavigatorScreenParams<HomeTabParamList>;
  Login: undefined;
  LoginOtpCheck: { credentials: AuthModel.Credentials };
  Register: undefined;
  RegisterTermAndCondition: undefined;
  RegisterOtpCheck: { registration: AuthModel.User };
  SubCategoryList: { parentCategoryId?: number; title: string };
  UserRequest: {
    item: SharedModel.SubCategory;
  };
  TaskDetail: {
    id: number;
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
  TaskBudget: { task: TaskModel.TaskRequest };
  CreateOffer: { taskId: number };
  TaskerStack: NavigatorScreenParams<TaskerParamList>;
  RegistrationInformation: undefined
};


export type TaskerParamList = {
  RegisterTasker: {
    profile?: ProfileModel.ProfileRequest;
  };
  RemarkListView: {
    label: string;
    setValue: UseFormSetValue<FieldValues>;
    name: string;
    value: string[];
    tags?: ProfileModel.ProfileTag[];
  };
  TaskerView: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}