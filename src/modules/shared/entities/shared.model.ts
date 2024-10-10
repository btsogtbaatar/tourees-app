export namespace SharedModel {
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

  export type SubCategory = {
    id: number;
    name: string;
    image: SharedModel.File;
    parentCategory: Category;
    description?: string;
    instruction: string;
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
