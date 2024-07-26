import axios from 'axios';

const defaultUrl = 'http://localhost:8080';
const imageUrl = `${defaultUrl}/file/resource/`;

export const getEnv = () => {
  return {
    API_URL: defaultUrl,
    IMAGE_URL: imageUrl,
  };
};

export const api = axios.create({
  baseURL: `${getEnv().API_URL}`,
  headers: { 'Content-Type': 'application/json' },
});
