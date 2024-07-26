import { getEnv } from '../api';

export function getImageUrl(url: string): string {
  return `${getEnv().IMAGE_URL}${url}`;
}
