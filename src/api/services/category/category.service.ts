import { api } from '../..';
import { CategoryModule } from '../../../modules/Auth/entities';

function getCateories(): Promise<CategoryModule.Categories[]> {
  const params = {
    is_app: 1,
  };
  return api.get('api/categories', { params });
}

function getCateory(id: number): Promise<CategoryModule.Categories[]> {
  return api.get(`api/category/${id}`);
}

export const categoriesService = {
  getCateories,
  getCateory,
};
