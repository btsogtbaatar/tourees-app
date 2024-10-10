import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../context/app/store';
import { NotificationModel } from '../entities/notification.model';

export interface NotificationState {
  unreadCount: number;
  notifications: NotificationModel.Notification[];
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    unreadCount: 0,
  } as NotificationState,
  reducers: {
    setNotifications: (
      state,
      action: PayloadAction<NotificationModel.Notification[]>,
    ) => {
      state.notifications = action.payload;
    },
    setUnreadNotificationCount: (
      state,
      action: PayloadAction<NotificationModel.UnreadNotificationCount>,
    ) => {
      state.unreadCount = action.payload.count;
    },
  },
});

export const { setUnreadNotificationCount, setNotifications } =
  notificationSlice.actions;

export const selectUnreadNotificationCount = (state: RootState) =>
  state.notification.unreadCount;
export const selectNotifications = (state: RootState) =>
  state.notification.notifications;
export default notificationSlice.reducer;
