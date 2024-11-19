import { NavigatorScreenParams } from '@react-navigation/native';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import { AuthModel } from '../modules/Auth/entities';
import { HomeStackParamList as HomeTabParamList } from '../modules/Home/navigation/types';
import { Schema } from '../modules/Profile/model/registration.model';
import {
  AddressType,
  ServiceTag,
  TaskerServiceModel,
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
  TaskerService: undefined;
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
  BiometricConfig: undefined;
  CreatePin: { oldPin?: string };
  EnterPin: { authenticating: boolean };
  RetypePin: { pin: string; oldPin?: string };
  TaskBudget: { task: TaskModel.TaskRequest };
  CreateOffer: { taskId?: number; id?: number };
  EditOffer: { taskId?: number; id?: number };
  MyOfferTasks: undefined;
  Photos: { images: string[]; index: number };
  RegistrationInformation: undefined;
  Chat: { id: number };
  TaskerServiceView: { id: number; title: string };
  TaskerServiceSearch: { subCategoryId?: number; subCategoryName?: string };
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
  TaskerView: { id: number };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type TaskerServiceParamList = {
  RegisterTaskerService: {
    service?: TaskerServiceModel;
  };
  RemarkListView: {
    label: string;
    setValue: UseFormSetValue<FieldValues>;
    name: string;
    value: string[];
    tags?: ServiceTag[];
  };
};
