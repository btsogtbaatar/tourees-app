import { Client } from '@stomp/stompjs';
import { api, getEnv } from '../../../api';
import store from '../../../context/app/store';
import { SharedModel } from '../../Shared/entities/shared.model';
import { TaskModel } from '../entities/request.model';

export function getTasks(
  page: number = 1,
  size = 10,
): Promise<SharedModel.Pagination<TaskModel.TaskResponse>> {
  const params = {
    page: page - 1,
    size: size,
  };
  return api.get('/tasks', { params: params });
}


export function getMyTasks(
  page: number = 1,
  size = 10,
): Promise<SharedModel.Pagination<TaskModel.TaskResponse>> {
  const params = {
    page: page - 1,
    size: size,
  };
  return api.get('/tasks/created/', { params: params });
}

export function createOffer(offer: TaskModel.CreateOffer): Promise<TaskModel.OfferResponse> {
  return api.post('/offers', offer);
}

export function getTask(
id: number): Promise<TaskModel.TaskResponse> {
  return api.get(`/tasks/${id}`);
}

export async function getLastTaskFromAddress(): Promise<
  TaskModel.Address | undefined
> {
  let page = await getTasks(1, 1);

  if (
    page.content.length > 0 &&
    page.content[0].addresses !== undefined &&
    page.content[0].addresses.length > 0
  ) {
    return page.content[0].addresses.find(_address => _address.name === 'from');
  }

  return undefined;
}

export function getChats(taskId: number): Promise<TaskModel.Chat[]> {
  return api.get(`/chat/${taskId}`);
}
export function sendChat(
  taskID: number,
  message: string,
): Promise<TaskModel.Chat> {
  return api.post(`/chat`, { taskID: taskID, message: message });
}
export function createTask(
  task: TaskModel.TaskRequest,
) {
  return api.post('/tasks', task);
}

export function subscribeToNotification(
  fn: (chat: TaskModel.Chat) => void,
): Client {
  const client = new Client({
    brokerURL: getEnv().BROKER_URL,
    connectHeaders: {
      Authorization: `Bearer ${store.getState().auth.token?.jwt}`,
    },
    debug: str => {
      console.log(str);
    },
    onConnect: () => {
      client.subscribe('/user/queue/notification/chat', message => {
        const chat = JSON.parse(message.body) as TaskModel.Chat;
        fn(chat);
      });
      client.subscribe('/user/queue/notification/task', message => {
        console.log(`Received: ${JSON.parse(message.body).content}`);
        console.log(JSON.parse(message.body));
      });
    },
    onStompError: e => {
      console.log(e);
    },
    onWebSocketError: e => {
      console.log(e);
    },
    onWebSocketClose: e => {
      console.log(e);
    },
  });
  return client;
}
