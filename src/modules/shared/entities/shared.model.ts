import { AuthModel } from '../../Auth/entities';
import { Address } from '../pages/AddressMapView/AddressesMapView';
export namespace SharedModel {
  export type ConversationID = {
    id: number;
  };
  export type Pagination<T> = {
    content: T[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
    numberOfElements: number;
    size: number;
    number: number;
    sort: Sort;
    empty: boolean;
  };

  export type Pageable = {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };

  export type Sort = {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };

  export type File = {
    id: number;
    url: string;
    name: string;
    extension: string;
    size: number;
  };

  export type Category = {
    id: number;
    name: string;
    image?: SharedModel.File;
  };

  export enum CategoryLocationType {
    Route = 'ROUTE',
    SingleLocation = 'SINGLE_LOCATION',
    Remote = 'REMOTE',
  }

  export type SubCategory = {
    id: number;
    name: string;
    image: SharedModel.File;
    parentCategory: Category;
    description?: string;
    instruction: string;
    locationType: CategoryLocationType;
  };

  export type SubCategoryFilter = {
    name?: string;
    parentCategoryId?: number;
  };

  export type NearbyPlacesResponse = {
    places: Place[];
  };

  export type Place = {
    id: string;
    types: string[];
    location: Location;
    shortFormattedAddress: string;
    formattedAddress?: string;
    displayName: DisplayName;
  };

  export type DisplayName = {
    text: string;
  };

  export type Location = {
    latitude: number;
    longitude: number;
  };
  export interface TimeRange {
    start: Date;
    end: Date;
  }
  export interface FieldControll {
    value: any;
    onChange: any;
  }

  export interface Error {
    code: string;
    message: string;
    details: any;
  }
  export type TaskerServiceModel = {
    id: number;
    name: string;
    files?: File[];
    description: string;
    tag: string;
    isInPersion?: boolean;
    isFlexible?: boolean;
    distance: number;
    autoMsg: string;
    timeRange: TimeRange;
    subCategory: Category;
    contractor: {
      user: AuthModel.User;
      address?: string;
      profilePicture?: File;
    };
    address?: Address;
    price: number;
  };

  export type TaskerServiceFilter = {
    name?: string;
    subCategoryId?: number;
    country?: string;
  };

  export type ToureesError = {
    code: string;
    message: string;
    details: any;
  };
}
export enum TaskerType {
  INDIVIDUAL = 'INDIVIDUAL',
  BUSINESS = 'BUSINESS',
}
export enum FormField {
  NAME,
  USERNAME,
  EMAIL,
  PHONE,
  ADDRESS,
  TYPE,
}
export enum ProfileWorkingType {
  ONLINE = 'ONLINE',
  PHYSICALLY = 'PHYSICALLY',
}

export enum TaskerServiceSortType {
  PRICE_LOW = 'PRICE_LOW',
  PRICE_HIGH = 'PRICE_HIGH',
  DEFAULT = 'DEFAULT',
}
