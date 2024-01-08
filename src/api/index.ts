import axios from 'axios';

// laravel API url
const defaultUrl = 'http://localhost:8000/v1';

export const getEnv = () => {
  return {
    API_URL: defaultUrl,
  };
};

export const api = axios.create({
  baseURL: `${getEnv().API_URL}`,
  headers: { 'Content-Type': 'application/json' },
});
