import axios from 'axios';

// const baseURL = '192.168.7.166:8080';
const baseURL = '35.74.204.126:8080';
const defaultUrl = `http://${baseURL}`;
const imageUrl = `${defaultUrl}/file/resource/`;
const brokerUrl = `ws://${baseURL}/ws/websocket`;

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
