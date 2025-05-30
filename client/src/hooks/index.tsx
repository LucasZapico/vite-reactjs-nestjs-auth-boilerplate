import { PrimeApi } from '@/config/axios.config';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';

export const mainHook = ({key,}: {key: string}) => {
   return useQuery({
    queryKey: key,
    queryFn: async () => {
      const response = PrimeApi({
        method,
        url,
        data,
        params,
      })
      return response.data;
    },
    ...options,
  });
}

