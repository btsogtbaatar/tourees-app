export type DashboardStackParamList = {
  Home: undefined;
  Request: undefined;
  Profile: undefined;
  RequestList: { screen: string; params: { title: string; requestId: number } };
  RequestStack: {
    screen: string;
    params: { title: string; requestId: number };
  };
  AuthStack: { screen: string; params?: { title: string } };
  RequestReg: undefined;
  UserRequest: undefined;
  navigate: (screen: string, route: any) => void;
};
