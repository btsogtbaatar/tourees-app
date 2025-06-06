import { AuthModel } from "../../Auth/entities";

export declare module NotificationModel {
  export type Notification = {
    id: number;
    title: string;
    body: string;
    user: AuthModel.User;
    read: boolean;
    path: string;
    data: any;
    createdDate: Date;
  };

  export type UnreadNotificationCount = {
    count: number;
  };
}
