import { Image } from '../../../node_modules/react-native/types/index';
import { CategoryModule } from '../../modules/Auth/entities';

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
    sub_category: CategoryModule.Categories;
    custom_status: StatusType;
  };

  export type StatusType = {
    id: number;
    code: string;
    name: string;
    description: string;
    type: string;
  };

  export type RequestAdditional = {
    latitude: number;
    longitude: number;
    address: string;
    name: string;
  };
  export type RequestResponse = {
    message?: string;
    data: Request[];
    current_page: number;
    last_page: number;
  };
}
