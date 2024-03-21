import axios from 'axios';

// laravel API url
const defaultUrl = `https://tourees-admin-j7ozojf9u-battushig-tsogtbaatars-projects.vercel.app/api`;
// const defaultUrl = `http://localhost:8000`;
const imageUrl = `${defaultUrl}/storage/`;

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
