import { api } from '../..';
import { CategoryModule } from '../../../modules/Auth/entities';

function getCateories(value: string): Promise<CategoryModule.Categories[]> {
  const params = {
    code: value,
  };
  return api.get('api/categories', { params });
}

function getCateory(id: number): Promise<CategoryModule.Category[]> {
  return api.get(`api/category/${id}`);
}

export const categoriesService = {
  getCateories,
  getCateory,
};
