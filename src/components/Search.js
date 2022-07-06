import React, { useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { getItems, patchItem } from '../queries/search';
import SearchResult from './SearchResult';
import { useAppContext } from '../contexts/AppContext';

const DEFAULT_RESULTS_PER_PAGE = 10;

const Search = function () {
  const {
    state: { search },
    dispatch,
  } = useAppContext();

  const setQueryTerm = useCallback(
    async event => {
      dispatch({
        type: 'SET_QUERY_TERM',
        payload: { queryTerm: event.target.value },
      });
    },
    [dispatch]
  );

  const getSearchResults = useCallback(
    async queryTerm => {
      if (!queryTerm) {
        dispatch({
          type: 'SET_SEARCH_RESULTS',
          payload: { items: [] },
        });
        return;
      }

      try {
        const items = await getItems({
          q: queryTerm,
          _limit: DEFAULT_RESULTS_PER_PAGE,
          _page: 1,
        });
        dispatch({
          type: 'SET_SEARCH_RESULTS',
          payload: { items },
        });
      } catch (e) {
        dispatch({
          type: 'FLASH_ERROR',
          payload: { message: 'Oops! Could not fetch search results.' },
        });
        throw e;
      }
    },
    [dispatch]
  );

  const getStarredItems = useCallback(async () => {
    try {
      const starredItems = await getItems({ starred: true });
      dispatch({
        type: 'SET_STARRED_ITEMS',
        payload: { starredItems },
      });
    } catch (e) {
      dispatch({
        type: 'FLASH_ERROR',
        payload: { message: 'Oops! Could not fetch starred items.' },
      });
      throw e;
    }
  }, [dispatch]);

  const toggleIsItemStarred = useCallback(
    async item => {
      const updatedProps = { starred: !item.starred };
      dispatch({
        type: 'WILL_UPDATE_ITEM',
        payload: { updatedItem: { ...item, ...updatedProps } },
      });

      try {
        await patchItem(item.id, updatedProps);
      } catch (e) {
        dispatch({
          type: 'FAILED_UPDATE_ITEM',
          payload: { originalItem: item },
        });
        dispatch({ type: 'FLASH_ERROR' });
        throw e;
      }
    },
    [dispatch]
  );

  useEffect(() => {
    getSearchResults(search.queryTerm);
  }, [search.queryTerm, getSearchResults]);

  useEffect(() => {
    getStarredItems();
  }, [getStarredItems]);

  return (
    <Box display="flex" flexDirection="column" className="u-fullHeight">
      <Box
        px={3}
        py={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        className="u-bgBlue u-borderBottom"
      >
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search for ..."
          onChange={setQueryTerm}
        />
        <div>
          <strong>Starred Items: </strong>
          {search.starredItemIds.length}
        </div>
      </Box>

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
