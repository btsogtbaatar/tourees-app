import { SharedModel } from '../../shared/entities/shared.model';

export type RequestStackParamList = {
  SubCategoryList: { parentCategoryId?: number; title: string };
  UserRequest: {
    item: SharedModel.SubCategory;
  };
  RequestDetail: { title: string };
};
