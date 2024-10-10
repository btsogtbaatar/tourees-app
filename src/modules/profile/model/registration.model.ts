import { TaskerType } from '../../Shared/entities/shared.model';

export type FullName = {
  firstName: string;
  lastName: string;
};
export type UserName = {
  username: string;
};
export type Email = {
  email: string;
};
export type Phone = {
  phoneNumber: string;
};
export type Address = {
  address: string;
};
export type Type = {
  type: TaskerType;
};
export type Schema = FullName | UserName | Email | Phone | Address | Type;
