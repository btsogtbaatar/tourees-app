import axios from 'axios';

// laravel API url
const defaultUrl = 'http:/10.0.2.2:8000';
const imageUrl = 'http:/10.0.2.2:8000/storage/';

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
