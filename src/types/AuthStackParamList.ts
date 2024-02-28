import { LoginModel } from '../context/entities';
import { RegisterModule } from '../modules/Auth/entities';

export type AuthStackParamList = {
  AuthStack: undefined;
  Login: any;
  LoginOtpCheck: { credentials: LoginModel.Credentials };
  SignUp: undefined;
  SignUp1:
    | { values: any; registerType: RegisterModule.RegisterType }
    | undefined;
  SignUpOtp: { signUp?: RegisterModule.RegisterType; code?: string };
  SignUpTerm: { id: number; username: string };
  navigate: (screen: string, route: any) => void;
};
