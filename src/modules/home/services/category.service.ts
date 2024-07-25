import { api } from '../../../api';
import { SharedModel } from '../../shared/entities/shared.model';

export function getCategories(
  page = 0,
  size = 100,
): Promise<SharedModel.Pagination<SharedModel.Category>> {
  return api.get('/categories', { params: { page, size } });
}

export function getSubCategories(
  filter?: SharedModel.SubCategoryFilter,
  page = 0,
  size = 100,
): Promise<SharedModel.Pagination<SharedModel.SubCategory>> {
  return api.get('/sub-categories', {
    params: {
      page,
      size,
      'parentGategory.id': filter?.parentCategoryId,
      name: filter?.name,
    },
  });
}
