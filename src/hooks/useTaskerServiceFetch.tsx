import _, { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import {
  fetchCreatedTaskerServices,
  fetchTaskerServices,
} from '../modules/Request/service/tasker.service';
import {
  SharedModel,
  TaskerServiceSortType,
} from '../modules/Shared/entities/shared.model';

export function useTaskerServiceFetch(subCategoryId?: number) {
  const [taskerServices, setTaskerServices] = useState<
    SharedModel.TaskerServiceModel[]
  >([]);
  const [filter, setFilter] = useState<SharedModel.TaskerServiceFilter>({
    subCategoryId: subCategoryId,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [sortValue, setSortValue] = useState<string>('');
  const [createdTaskerServices, setCreatedTaskerServices] =
    useState<SharedModel.TaskerServiceModel[]>();

  useEffect(() => {
    getTaskerServices(filter);
    getCreatedTaskerServices();

    return () => {
      setTaskerServices([]);
      setCreatedTaskerServices([]);
    };
  }, []);

  const groupTaskServiceSubCategory = () => {
    const groupedTaskerService = _.chain(taskerServices)
      .groupBy(task => `${task.subCategory.name}-@${task.subCategory.id}`)
      .map((value, key) => {
        return { title: key.split('-@', 2), data: value };
      })
      .value();
    return groupedTaskerService;
  };

  const getCreatedTaskerServices = () => {
    fetchCreatedTaskerServices().then(x => {
      setCreatedTaskerServices(x);
    });
  };

  const getTaskerServices = (_filter: SharedModel.TaskerServiceFilter) => {
    setFilter(_filter);
    setLoading(true);
    fetchTaskerServices(_filter)
      .then(
        (response: SharedModel.Pagination<SharedModel.TaskerServiceModel>) => {
          setTaskerServices(response.content);
          setLoading(false);
        },
      )
      .catch(() => {
        setLoading(false);
      });
  };

  const onSubmitSearch = (text: string) => {
    setSortValue('');
    handler({ ...filter, name: text });
  };

  const onSubmitSort = (type: string) => {
    let sortData = [...taskerServices];
    setSortValue(type);
    setLoading(true);
    if (type === TaskerServiceSortType.PRICE_LOW) {
      sortData = [...taskerServices].sort((a, b) => a.price - b.price);
    } else if (type === TaskerServiceSortType.PRICE_HIGH) {
      sortData = [...taskerServices].sort((a, b) => b.price - a.price);
    }
    setLoading(false);
    setTaskerServices(sortData);
  };

  const handler = useCallback(debounce(getTaskerServices, 500), []);

  return {
    taskerServices,
    filteredGroupedTaskService: groupTaskServiceSubCategory(),
    onSubmitSearch: onSubmitSearch,
    loading: loading,
    onSubmitSort: onSubmitSort,
    sortValue: sortValue,
    createdTaskerServices,
    getCreatedTaskerServices,
    setCreatedTaskerServices,
  };
}
