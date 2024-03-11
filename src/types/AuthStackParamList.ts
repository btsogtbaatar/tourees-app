import { LoginModel } from '../context/entities';
import { RegisterModule } from '../modules/Auth/entities';
import { BaseStackParamList } from './BaseStackParamList';

type StackType = {
  AuthStack: undefined;
  RegisterUsername: undefined;
  RegisterTerm: undefined;
  Login: undefined;
  LoginOtpCheck: { credentials: LoginModel.Credentials };
  SignUp: undefined;
  SignUp1:
    | { values: any; registerType: RegisterModule.RegisterType }
    | undefined;
  SignUpOtp: { signUp?: RegisterModule.RegisterType; code?: string };
  SignUpTerm: { id: number; username: string };
}

export type AuthStackParamList = StackType & BaseStackParamList;
