import { Client, StompSubscription } from '@stomp/stompjs';
import { getEnv } from '../../../api';
import { useSelector } from 'react-redux';
import { selectAuthenticated, selectToken } from '../../Auth/slice/authSlice';
import { useEffect, useRef } from 'react';

let client: Client | null;

const activateSocket = (token: string) => {
  client = new Client({
    brokerURL: getEnv().BROKER_URL,
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    debug: str => {
      console.log('debug console:', str);
    },
    onConnect: str => {
      console.log('connection successful:', str);
    },
    onStompError: e => {
      console.log('Stomp error:', e);
    },
    onWebSocketError: e => {
      console.log('socket error:', e);
    },
    onWebSocketClose: e => {
      console.log('socket closed message:', e);
    },
  });
  client.activate();
};
const disableSocket = () => {
  if (!client) {
    return;
  }
  client.deactivate();
  client = null;
};
export function useSocket(): () => void {
  const auth = useSelector(selectAuthenticated);
  const token = useSelector(selectToken);
  useEffect(() => {
    if (auth && token?.jwt) {
      activateSocket(token?.jwt);
    } else {
      disableSocket();
    }
  }, [auth, token]);
  return () => {
    disableSocket();
  };
}
export function useStompConnection<T>(path: string, fn: (value: T) => void) {
  const ref = useRef<StompSubscription | null>(null);
  useEffect(() => {
    if (!client) {
      return;
    }
    console.log('creating');
    if (ref.current) {
      return;
    }
    ref.current = client.subscribe(
      `/user/queue/notification/${path}`,
      message => {
        const value = JSON.parse(message.body) as T;
        fn(value);
      },
    );
    return () => {
      console.log('Stomp cleanup successful');
      ref.current?.unsubscribe();
    };
  }, []);

  return;
}
