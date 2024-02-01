import { RegisterModule } from "../modules/Auth/entities";

export type AuthStackParamList = {
    AuthStack: undefined,
    SignUp: undefined,
    SignUp1: {values: any, registerType: RegisterModule.RegisterType} | undefined,
    SignUpOtp: {signUp: RegisterModule.RegisterType},
    SignUpTerm: undefined,
    navigate: (screen: string, route: any) => void;
}