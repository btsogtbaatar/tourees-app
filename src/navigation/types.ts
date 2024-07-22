import { NavigatorScreenParams } from '@react-navigation/native';
import { AuthStackParamList } from '../modules/Auth/navigation/types';
import { HomeStackParamList } from '../modules/Home/navigation/types';
import { RequestStackParamList } from '../modules/Request/navigation/types';

export type BaseStackParamList = {
  navigate: (screen: string, route?: any) => void;
  goBack: () => void;
  canGoBack: () => boolean;
};

export type RootStackParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  RequestStack: NavigatorScreenParams<RequestStackParamList>;
} & BaseStackParamList;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
