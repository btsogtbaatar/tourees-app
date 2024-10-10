import axios from 'axios';

export const defaultUrl = 'http://localhost:8080';
const imageUrl = `${defaultUrl}/file/resource/`;
const brokerUrl = `ws://localhost:8080/ws/websocket`;

export const getEnv = () => {
  return {
    API_URL: defaultUrl,
    IMAGE_URL: imageUrl,
    BROKER_URL: brokerUrl,
  };
};

export const api = axios.create({
  baseURL: `${getEnv().API_URL}`,
  headers: { 'Content-Type': 'application/json' },
});
