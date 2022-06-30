import axios from 'axios';

const API_HOST = 'http://localhost:3001';

export async function getSearchResults(paramObj) {
  const params = Object.keys(paramObj).map(key => `${key}=${paramObj[key]}`);
  const response = await axios.get(`${API_HOST}/search?${params.join('&')}`);
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
