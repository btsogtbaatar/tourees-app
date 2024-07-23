import { AuthModel } from '../../auth/entities';
import { SharedModel } from '../../shared/entities/shared.model';

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
    addresses: Address[];
  };

  export type Address = {
    name?: string;
    address?: string;
    latitude: number;
    longitude: number;
  };

  export type SubCategory = {
    id: number;
  };
}
