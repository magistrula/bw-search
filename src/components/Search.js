import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { getItems, patchItem } from '../queries/search';
import SearchResult from './SearchResult';

const DEFAULT_RESULTS_PER_PAGE = 10;

const Search = function() {
  // Future work: enable user to specify results per page
  const [resultsPerPage] = useState(DEFAULT_RESULTS_PER_PAGE);
  const [items, setItems] = useState([]);
  const [starredItems, setStarredItems] = useState([]);

  const getQueryItems = useCallback(
    async event => {
      if (!event.target.value) {
        setItems([]);
        return;
      }

      const returnedResults = await getItems({
        q: event.target.value,
        _limit: resultsPerPage,
        _page: 1,
      });
      setItems(returnedResults);
    },
    [resultsPerPage]
  );

  const getStarredItems = useCallback(async () => {
    const returnedResults = await getItems({ starred: true });
    setStarredItems(returnedResults);
  }, []);

  const toggleIsResultStarred = useCallback(
    async item => {
      // TODO: Rework this so that the UI reflects the expected update immediately
      // and rolls it back if there is an error on save.
      const updatedItem = await patchItem(item.id, { starred: !item.starred });

      // TODO: In an Ember app, the Ember store would update the target record on successful patch,
      // and the SearchItem component that renders that record would automatically update.
      // What is the right way to do this in React?
      const updatedItems = items.map(r => (r.id === item.id ? updatedItem : r));
      setItems(updatedItems);

      const updatedStarredItems = updatedItem.starred
        ? starredItems.concat(updatedItem)
        : starredItems.filter(r => r.id !== item.id);
      setStarredItems(updatedStarredItems);
    },
    [items, starredItems]
  );

  useEffect(() => {
    getStarredItems();
  }, []);

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
          onChange={getQueryItems}
        />
        <div>
          <strong>Starred Items: </strong>
          {starredItems.length}
        </div>
      </Box>

      <Box flex="1" p={3} className="u-scrollable">
        {items.map(item => (
          <Box mb={1.5} key={item.id}>
            <SearchResult item={item} toggleIsStarred={toggleIsResultStarred} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Search;
