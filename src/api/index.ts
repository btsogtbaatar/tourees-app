import axios from 'axios';

// const baseURL = '192.168.1.72:8080';
const baseURL = 'dv3427era6fzn.cloudfront.net';
const defaultUrl = `https://${baseURL}`;
const imageUrl = `${defaultUrl}/file/resource/`;
const brokerUrl = `wss://${baseURL}/ws/websocket`;

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
