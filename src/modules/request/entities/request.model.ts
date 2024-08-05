import { AuthModel } from '../../Auth/entities';
import { SharedModel } from '../../Shared/entities/shared.model';

export declare namespace TaskModel {
  export enum TaskStatus {
    NEW,
    ASSIGNED,
    IN_PROGRESS,
    COMPLETED,
    CANCELLED,
  }

  export type TaskResponse = {
    id: number;
    status: TaskStatus;
    createdDate: string;
    description: string;
    subCategory: SharedModel.SubCategory;
    contractor: AuthModel.RegisterResponse;
    customer: AuthModel.RegisterResponse;
    files: SharedModel.File[];
    addresses: Address[];
  };

  export type TaskRequest = {
    description: string;
    subCategory: SubCategory;
    files: SharedModel.File[];
    timeRange: SharedModel.TimeRange;
    addresses: Address[];
  };

  export type Addresses = {
    from: Address;
    to: Address;
  };

  export type Address = {
    name?: AddressType;
    displayName?: string;
    address?: string;
    latitude: number;
    longitude: number;
  } & AddressDetail;

  export type AddressDetail = {
    unit?: string;
    floor?: string;
    apartment?: string;
  };

  export type SubCategory = {
    id: number;
  };
}

export enum AddressType {
  From = 'from',
  To = 'to',
}
