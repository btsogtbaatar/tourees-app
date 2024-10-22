import { Moment } from 'moment';
import { api } from '../../../api';
import { ImageSource } from '../../../components/ImageUploadButton/ImageUploadButton';
import { SharedModel } from '../../Shared/entities/shared.model';
import { uploadFile } from '../../Shared/services/shared.service';
import { SeparatorType, TaskModel } from '../entities/request.model';
import moment from 'moment';

export function getChats(
  taskId: number,
  page?: number,
  size?: number,
): Promise<SharedModel.Pagination<TaskModel.Chat>> {
  return api.get(`/chat/${taskId}?page=${page}&size=${size}`);
}
export function getConversation(id: number): Promise<TaskModel.Conversation> {
  return api.get(`/conversation/${id}`);
}
export async function sendChat(
  taskID: number,
  message?: string,
  images?: ImageSource[],
): Promise<TaskModel.Chat> {
  const promises: Promise<SharedModel.File>[] = [];
  if (images) {
    images.forEach(image => {
      promises.push(uploadFile(image));
    });
  }
  const files = await Promise.all(promises);
  return api.post(`/chat`, {
    conversationID: taskID,
    message: message,
    files: files,
  });
}
export const addSeparator = (
  prev: TaskModel.Chat,
  current: TaskModel.Chat,
  comperator: (p: Moment, c: Moment) => boolean,
  date: Moment,
  userID: number,
) => {
  const prevDate = moment(prev.createdDate.split('T')[0]);
  const prevTime = moment(prev.createdDate);
  const currentDate = moment(current.createdDate.split('T')[0]);
  const currentTime = moment(current.createdDate);
  const chats: TaskModel.Message[] = [];
  if (!currentDate.isSame(prevDate)) {
    chats.push({
      type: SeparatorType.DATE,
      id: userID,
      message: date.format('DD/MM/YYYY'),
      user: current.user,
    });
  }
  if (comperator(prevTime, currentTime) || prev.user.id != current.user.id) {
    chats.push({
      type: SeparatorType.TIME,
      id: userID,
      message: date.format('hh:mm'),
      user: current.user,
    });
  }
  chats.push({ ...current, type: SeparatorType.CHAT });
  return chats;
};
