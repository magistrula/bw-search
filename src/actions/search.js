export function setQueryTerm(queryTerm) {
  return {
    type: 'SET_QUERY_TERM',
    payload: { queryTerm },
  };
}

export function setSearchResults(items) {
  return {
    type: 'SET_SEARCH_RESULTS',
    payload: { items },
  };
}

export function setStarredItems(starredItems) {
  return {
    type: 'SET_STARRED_ITEMS',
    payload: { starredItems },
  };
}

export function willUpdateItem(updatedItem) {
  return {
    type: 'WILL_UPDATE_ITEM',
    payload: { updatedItem },
  };
}

export function failedUpdateItem(originalItem) {
  return {
    type: 'FAILED_UPDATE_ITEM',
    payload: { originalItem },
  };
}
