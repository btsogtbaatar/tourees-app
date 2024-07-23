import { BaseStackParamList } from '../../../navigation/types';
import { SharedModel } from '../../shared/entities/shared.model';

type StackType = {
  SubCategoryList: { parentCategoryId?: number; title: string };
  UserRequest: {
    item: SharedModel.SubCategory;
  };
  RequestDetail: { title: string; status: number; url: string };
};

export type RequestStackParamList = StackType & BaseStackParamList;
