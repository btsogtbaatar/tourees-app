import { BaseStackParamList } from '../../../navigation/types';
import { AuthModel } from '../entities';

type StackType = {
  Login: undefined;
  LoginOtpCheck: { credentials: AuthModel.Credentials };
  Register: undefined;
  RegisterTermAndCondition: undefined;
  RegisterOtpCheck: { registration: AuthModel.RegisterResponse };
};

export type AuthStackParamList = StackType & BaseStackParamList;
