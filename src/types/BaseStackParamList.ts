export type BaseStackParamList = {
  navigate: (screen: string, route?: any) => void;
  goBack: () => void;
  canGoBack: () => boolean;
};
