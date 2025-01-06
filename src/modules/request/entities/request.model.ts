import { Moment } from 'moment';
import { AuthModel } from '../../Auth/entities';
import { SharedModel } from '../../Shared/entities/shared.model';
import { Address } from '../../Shared/pages/AddressMapView/AddressesMapView';

export enum TaskStatus {
  NEW = 'NEW',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export declare namespace TaskModel {
  export type OfferTask = {
    id: number;
    customer: User;
  };

  export type TaskResponse = {
    id: number;
    name: string;
    budget: number;
    timeRange: SharedModel.TimeRange;
    status: TaskStatus;
    createdDate: string;
    description: string;
    subCategory: SharedModel.SubCategory;
    contractor: {
      user: AuthModel.User;
    };
    customer: {
      user: AuthModel.User;
    };
    files: SharedModel.File[];
    addresses: Address[];
    offers: OfferResponse[];
  };
  export type TaskRequest = {
    description: string;
    name: string;
    budget?: number;
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

  export type CreateOffer = {
    id?: number;
    price: number;
    description: string;
    taskId?: number;
  };
  export type OfferResponse = {
    id: number;
    price: number;
    description: string;
    task: OfferTask;
    contractor: {
      user: AuthModel.User;
    };
  };
  export type User = {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    profile: SharedModel.File;
  };
  export type Conversation = {
    id: number;
    customerLastSeen: Moment;
    contractorLastSeen: Moment;
    participants: User[];
  };

  export type Chat = {
    type: SeparatorType;
    id: number;
    message: string;
    files: SharedModel.File[];
    createdDate: string;
    user: User;
    taskID: number;
  };
  export type Message =
    | { type: SeparatorType; message: string; id: number; user: User }
    | Chat;
}
export enum SeparatorType {
  DATE,
  TIME,
  CHAT,
}
export enum AddressType {
  From = 'from',
  To = 'to',
}

export type TaskerServiceModel = {
  name: string;
  description: string;
  tag: string;
  services?: string[];
  price: number;
  autoMsg: string;
  category: SharedModel.Category;
  subCategory: SharedModel.SubCategory;
  files: SharedModel.File[];
  timeRange: SharedModel.TimeRange;
  address: Address[];
};
export interface ServiceTag {
  id: number;
  type: string;
  value: string;
}
