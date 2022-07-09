import React, { useCallback, useState } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import Box from '@mui/material/Box';

import { flashError } from '../actions/flash';
import { getItems, patchItem } from '../queries/search';
import SearchHeader from './SearchHeader';
import SearchResult from './SearchResult';
import { useAppContext } from '../contexts/AppContext';

const DEFAULT_RESULTS_PER_PAGE = 10;

const Search = function () {
  const { dispatch } = useAppContext();
  const queryClient = useQueryClient();
  const [isFilteredByStarred, setIsFilteredByStarred] = useState(false);
  const [isShowingStarredItems, setIsShowingStarredItems] = useState(false);
  const [queryTerm, setQueryTerm] = useState('');

  const itemsQuery = useQuery(
    ['items', queryTerm, isFilteredByStarred],
    () => {
      const params = {
        ...{ q: queryTerm, _limit: DEFAULT_RESULTS_PER_PAGE, _page: 1 },
        ...(isFilteredByStarred ? { starred: true } : {}),
      };
      return getItems(params);
    },
    {
      enabled: !!queryTerm,
      retry: false,
      initialData: [],
      onError(err) {
        dispatch(flashError('Oops! Could not fetch items'));
        throw err;
      },
    }
  );

  const starredItemsQuery = useQuery(
    'starredItems',
    () => {
      return getItems({ starred: true });
    },
    {
      initialData: [],
      retry: false,
      onError(err) {
        dispatch(flashError('Oops! Could not fetch starred items'));
        throw err;
      },
    }
  );

  const starItemMutation = useMutation(
    item => {
      return patchItem(item.id, { starred: !item.starred });
    },
    {
      onSuccess() {
        queryClient.invalidateQueries('items');
        queryClient.invalidateQueries('starredItems');
      },
      onError(err) {
        dispatch(flashError());
        throw err;
      },
    }
  );

  const changeSearchTerm = useCallback(
    event => {
      setQueryTerm(event.target.value);
    },
    [setQueryTerm]
  );

  const toggleFilterByStarred = useCallback(() => {
    setIsFilteredByStarred(!isFilteredByStarred);
  }, [isFilteredByStarred, setIsFilteredByStarred]);

  const showStarredItems = useCallback(() => {
    setIsShowingStarredItems(true);
  }, []);

  const showSearchField = useCallback(() => {
    setIsShowingStarredItems(false);
  }, []);

  const toggleIsItemStarred = useCallback(
    item => {
      return starItemMutation.mutateAsync(item);
    },
    [starItemMutation]
  );

  return (
    <Box display="flex" flexDirection="column" className="u-fullHeight">
      <SearchHeader
        changeSearchTerm={changeSearchTerm}
        enableSearch={showSearchField}
        isFilteredByStarred={isFilteredByStarred}
        isSearchEnabled={!isShowingStarredItems}
        numStarredItems={starredItemsQuery.data.length}
        queryTerm={queryTerm}
        showAllStarredItems={showStarredItems}
        toggleFilterByStarred={toggleFilterByStarred}
      />

      <Box flex="1" p={3} className="u-scrollable">
        {(isShowingStarredItems ? starredItemsQuery : itemsQuery).data.map(item => (
          <Box mb={1.5} key={item.id}>
            <SearchResult item={item} toggleIsStarred={toggleIsItemStarred} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Search;
