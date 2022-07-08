import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';

import {
  failedUpdateItem,
  setQueryTerm,
  setSearchResults,
  setStarredItems,
  willUpdateItem,
} from '../actions/search';
import { flashError } from '../actions/flash';
import { getItems, patchItem } from '../queries/search';
import SearchHeader from './SearchHeader';
import SearchResult from './SearchResult';
import { useAppContext } from '../contexts/AppContext';

const DEFAULT_RESULTS_PER_PAGE = 10;

const Search = function () {
  const {
    dispatch,
    state: { search },
  } = useAppContext();
  const [isFilteredByStarred, setIsFilteredByStarred] = useState(false);
  const [isSearchEnabled, setIsSearchEnabled] = useState(true);

  const toggleFilterByStarred = useCallback(() => {
    setIsFilteredByStarred(!isFilteredByStarred);
  }, [isFilteredByStarred]);

  const changeSearchTerm = useCallback(
    event => {
      dispatch(setQueryTerm(event.target.value));
    },
    [dispatch]
  );

  const getSearchResults = useCallback(
    async queryTerm => {
      if (!queryTerm) {
        dispatch(setSearchResults([]));
        return;
      }

      try {
        const queryProps = {
          ...{ q: queryTerm, _limit: DEFAULT_RESULTS_PER_PAGE, _page: 1 },
          ...(isFilteredByStarred ? { starred: true } : {}),
        };
        const items = await getItems(queryProps);
        dispatch(setSearchResults(items));
      } catch (e) {
        dispatch(flashError('Oops! Could not fetch search results.'));
        throw e;
      }
    },
    [dispatch, isFilteredByStarred]
  );

  const getStarredItems = useCallback(async () => {
    try {
      const starredItems = await getItems({ starred: true });
      dispatch(setStarredItems(starredItems));
    } catch (e) {
      dispatch(flashError('Oops! Could not fetch starred items.'));
      throw e;
    }
  }, [dispatch]);

  const showAllStarredItems = useCallback(async () => {
    try {
      const items = await getItems({ starred: true });
      dispatch(setSearchResults(items));
      dispatch(setStarredItems(items));
      setIsSearchEnabled(false);
    } catch (e) {
      dispatch(flashError('Oops! Could not fetch starred items.'));
      throw e;
    }
  }, [dispatch]);

  const toggleIsItemStarred = useCallback(
    async item => {
      const updatedProps = { starred: !item.starred };
      dispatch(willUpdateItem({ ...item, ...updatedProps }));

      try {
        await patchItem(item.id, updatedProps);
      } catch (e) {
        dispatch(failedUpdateItem(item));
        dispatch(flashError());
        throw e;
      }
    },
    [dispatch]
  );

  const enableSearch = useCallback(() => {
    setIsSearchEnabled(true);
    getSearchResults(search.queryTerm);
  }, [getSearchResults, search.queryTerm]);

  useEffect(() => {
    getSearchResults(search.queryTerm);
  }, [search.queryTerm, getSearchResults]);

  useEffect(() => {
    getStarredItems();
  }, [getStarredItems]);

  return (
    <Box display="flex" flexDirection="column" className="u-fullHeight">
      <SearchHeader
        isFilteredByStarred={isFilteredByStarred}
        isSearchEnabled={isSearchEnabled}
        numStarredItems={search.starredItemIds.length}
        queryTerm={search.queryTerm}
        enableSearch={enableSearch}
        changeSearchTerm={changeSearchTerm}
        showAllStarredItems={showAllStarredItems}
        toggleFilterByStarred={toggleFilterByStarred}
      />

      <Box flex="1" p={3} className="u-scrollable">
        {search.items.map(item => (
          <Box mb={1.5} key={item.id}>
            <SearchResult item={item} toggleIsStarred={toggleIsItemStarred} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Search;
