import axios from 'axios';

const API_HOST = 'http://localhost:3001';

export async function getSearchResults(searchTerm, { page, limit }) {
  const searchParam = `q=${searchTerm}`;
  const pageParam = page ? `&_page=${page}` : '';
  const limitParam = limit ? `&_limit=${limit}` : '';
  const queryParams = `${searchParam}${pageParam}${limitParam}`;

  const response = await axios.get(`${API_HOST}/search?${queryParams}`);
  return response.data;
}

export async function getStarredSearchResults() {
  const response = await axios.get(`${API_HOST}/search?starred=true`);
  return response.data;
}

export async function patchSearchResult(resultId, props) {
  const response = await axios.patch(`${API_HOST}/search/${resultId}`, props, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  return response.data;
}
