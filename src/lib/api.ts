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
  baseURL: baseUrl,
  timeout: 40000,
  responseType: 'json',
});

const api = async (options: RequestProps, init?: RequestInit) => {
  return request({
    // responseType: 'json',
    ...options,
  });
};

export default api;
