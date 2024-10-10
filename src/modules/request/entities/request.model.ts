import { AuthModel } from '../../Auth/entities';
import { SharedModel } from '../../Shared/entities/shared.model';

export enum TaskStatus {
  NEW = 'NEW',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}
export declare namespace TaskModel {
  export type TaskResponse = {
    id: number;
    status: TaskStatus;
    createdDate: string;
    description: string;
    subCategory: SharedModel.SubCategory;
    contractor: AuthModel.User;
    customer: AuthModel.User;
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
  export type User = {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
  };

  export type Chat = {
    type: SeperatorType;
    id: number;
    message: string;
    files: SharedModel.File[];
    createdDate: string;
    user: User;
    taskID: number;
  };
  export type Message =
    | { type: SeperatorType; message: string; id: number }
    | Chat;
}
export enum SeperatorType {
  DATE,
  TIME,
  CHAT,
}
export enum AddressType {
  From = 'from',
  To = 'to',
}
