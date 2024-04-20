import { baseUrl, ssrBaseUrl } from '@/constant/env';
import axios from 'axios';
// import { getCookie } from 'cookies-next';

// import { apiUrl, COOKIES_ACCESS_TOKEN } from '@/constant/env';

export interface RequestProps {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  url?: string;
  data?: any;
  headers?: any;
  params?: any;
  [propsName: string]: any;
}
const request = axios.create({
  baseURL: 'https://api.edamam.com/api/recipes/v2',
  timeout: 40000,
  responseType: 'json',
});

const api = async (options: RequestProps, init?: RequestInit) => {
  return request({
    responseType: 'json',
    ...options,
    params: {
      app_id: '6cd5254e',
      app_key: 'd823b0a29d06f10ffe5bbcb1fe951490',
      ...options.params,
    },
    headers: {
      'Edamam-Account-User': 'jaspery',
      'Accept-Language': 'en',
      ...options.headers,
    },
  });
};

export default api;
