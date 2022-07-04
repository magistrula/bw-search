import axios from 'axios';

const API_HOST = 'http://localhost:3001';

function createAxios() {
  return axios.create({
    baseURL: API_HOST,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

export function getQuery() {
  return createAxios().get(...arguments);
}

export function postQuery() {
  return createAxios().post(...arguments);
}

export function patchQuery() {
  return createAxios().patch(...arguments);
}

export function deleteQuery() {
  return createAxios().delete(...arguments);
}
