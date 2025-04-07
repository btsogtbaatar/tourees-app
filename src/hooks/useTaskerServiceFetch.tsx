import _, { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import { reverseGeocode } from '../utilities';
import { selectAuthenticated } from '../modules/Auth/slice/authSlice';
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
    subCategoryId: subCategoryId || undefined,
    name: '',
    country: '',
  });
  const [country, setCountry] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortValue, setSortValue] = useState<string>('');
  const [createdTaskerServices, setCreatedTaskerServices] =
    useState<SharedModel.TaskerServiceModel[]>();
  const isAuthenticated = useSelector(selectAuthenticated);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        const countryName = await reverseGeocode(latitude, longitude);
        setCountry(countryName);
      },
      error => console.warn(error.message),
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getCreatedTaskerServices();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (country) {
      setFilter(prev => ({ ...prev, country }));
    }
  }, [country]);

  useEffect(() => {
    if (filter.country) {
      getTaskerServices(filter);
    }
    return () => {
      setTaskerServices([]);
      setCreatedTaskerServices([]);
    };
  }, [filter]);

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

  const getTaskerServices = useCallback(
    (filter: SharedModel.TaskerServiceFilter) => {
      setLoading(true);
      fetchTaskerServices(filter)
        .then(
          (
            response: SharedModel.Pagination<SharedModel.TaskerServiceModel>,
          ) => {
            setTaskerServices(response.content);
            setLoading(false);
          },
        )
        .catch(() => setLoading(false));
    },
    [],
  );

  const onSubmitSearch = (text: string) => {
    setSortValue('');
    setFilter(prev => {
      const updatedFilter = { ...prev, name: text };
      handler(updatedFilter);
      return updatedFilter;
    });
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

  const handler = useCallback(debounce(getTaskerServices, 500), [
    getTaskerServices,
  ]);

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
