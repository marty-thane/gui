import { useMemo } from 'react';
import { DefaultApi } from '../api';
import { createBaseConfig } from '../config';

export const useApiClient = () => {
  return useMemo(() => {
    const config = createBaseConfig();
    return new DefaultApi(config);
  }, []);
};