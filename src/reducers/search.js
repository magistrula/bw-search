import union from 'lodash/union';

export function initialState() {
  return {
    items: [],
    starredItemIds: [],
    queryTerm: null,
  };
}

function replaceItem(existingItems, newItem) {
  return existingItems.map(item => (item.id === newItem.id ? newItem : item));
}

const ACTION_HANDLERS = {
  CLEAR_SEARCH_RESULTS: (state, { items }) => {
    return { ...state, items: [] };
  },

  SET_QUERY_TERM: (state, { queryTerm }) => {
    return { ...state, queryTerm };
  },

  SET_SEARCH_RESULTS: (state, { items }) => {
    return { ...state, items };
  },

  SET_STARRED_ITEMS: (state, { starredItems }) => {
    const starredItemIds = starredItems.map(item => item.id);
    return { ...state, starredItemIds };
  },

  WILL_UPDATE_ITEM: (state, { updatedItem }) => {
    const items = replaceItem(state.items, updatedItem);
    const starredItemIds = updatedItem.starred
      ? union(state.starredItemIds, [updatedItem.id])
      : state.starredItemIds.filter(id => id !== updatedItem.id);
    return { ...state, items, starredItemIds };
  },

  FAILED_UPDATE_ITEM: (state, { originalItem }) => {
    const items = replaceItem(state.items, originalItem);
    const starredItemIds = originalItem.starred
      ? union(state.starredItemIds, [originalItem.id])
      : state.starredItemIds.filter(id => id !== originalItem.id);
    return { ...state, items, starredItemIds };
  },
};

export default function reducer(state, action) {
  if (ACTION_HANDLERS[action.type]) {
    return ACTION_HANDLERS[action.type](state, action.payload || {});
  }

  return state;
}
