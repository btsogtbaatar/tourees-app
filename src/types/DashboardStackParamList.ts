export type DashboardStackParamList = {
  Home: object;
  Request: object;
  Profile: object;
  RequestList: {
    screen: string;
    params: { title: string; categoryId: number };
  };
  RequestStack: {
    screen: string;
    params: { title: string; categoryId: number };
  };
  AuthStack: { screen: string; params?: { title: string } };
  RequestReg: object;
  UserRequest: object;
  navigate: (screen: string, route: any) => void;
};
