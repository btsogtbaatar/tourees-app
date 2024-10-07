import { api } from '../../../api';
import { SharedModel } from '../../Shared/entities/shared.model';
import { NotificationModel } from '../entities/notification.model';

export function getNotificationList(): Promise<
  SharedModel.Pagination<NotificationModel.Notification>
> {
  return api.get('/notifications', { params: { page: 0, size: 10 } });
}

export function getUnreadNotificationCount(): Promise<NotificationModel.UnreadNotificationCount> {
  return api.get('/notifications/unread-count');
}

export function updateNotificationReadStatus(
  notificationId: number,
): Promise<NotificationModel.Notification> {
  return api.put(`/notifications/${notificationId}`);
}