import { Configuration } from '@/api/runtime';

const BASE_PATH = 'http://localhost:8000'; 

export const createBaseConfig = (): Configuration => {
  return new Configuration({
    basePath: BASE_PATH,
  });
};