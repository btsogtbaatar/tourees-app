import { Image } from '../../../node_modules/react-native/types/index';

export declare module RequestModule {
  export type Request = {
    user_id?: string;
    name?: string;
    sub_category_id?: number;
    details?: string;
    request_date?: string;
    status_code?: number;
    files?: Image;
    is_app?: boolean;
  };

  export type RequestAdditional = {
    user_id: string;
    name: string;
    sub_category_id: number;
    details: string;
    request_date: Date;
  };
  export type RequestResponse = {
    message?: string;
    data?: string;
  };
}
