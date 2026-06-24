import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NX_API_BASE_URL ?? 'http://localhost:3000/api',
});

let getToken: (() => string | undefined) | undefined;

export function setAuthTokenProvider(fn: () => string | undefined): void {
  getToken = fn;
}

apiClient.interceptors.request.use((config) => {
  const token = getToken?.();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
