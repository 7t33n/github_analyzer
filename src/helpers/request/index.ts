import axios, { RawAxiosRequestHeaders } from 'axios';

const getHeaders = (): RawAxiosRequestHeaders => {
  const headers: RawAxiosRequestHeaders = {
    Accept: 'application/json',
  };

  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  return headers;
};

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: getHeaders(),
});

const proxy = axios.create({
  baseURL: '/',
  timeout: 10000,
  headers: getHeaders(),
})

export {proxy};
export default instance;
