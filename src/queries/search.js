import { getQuery, postQuery, patchQuery, deleteQuery } from './base';

// GET    /search
export async function getItems(paramObj) {
  const params = Object.keys(paramObj).map(key => `${key}=${paramObj[key]}`);
  const response = await getQuery(`/search?${params.join('&')}`);
  return response.data;
}

// GET    /search/:id
export async function getItem(itemId) {
  const response = await getQuery(`/search/${itemId}`);
  return response.data;
}

// POST   /search
export async function createItem(props) {
  const response = await postQuery(`/search`, props);
  return response.data;
}

// PATCH  /search/:id
export async function patchItem(itemId, props) {
  const response = await patchQuery(`/search/${itemId}`, props);
  return response.data;
}

// DELETE /search/:id
export async function deleteItem(itemId, props) {
  await deleteQuery(`/search/${itemId}`);
}
