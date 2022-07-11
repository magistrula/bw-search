import axios from 'axios';

export const API_HOST = 'http://localhost:3001';

export const axiosInstance = axios.create({
  baseURL: API_HOST,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export function getQuery() {
  return axiosInstance.get(...arguments);
}

export function postQuery() {
  return axiosInstance.post(...arguments);
}

export function patchQuery() {
  return axiosInstance.patch(...arguments);
}

export function deleteQuery() {
  return axiosInstance.delete(...arguments);
}
