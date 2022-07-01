import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { getSearchResults, patchSearchResult } from '../utils/queries';
import SearchResult from './SearchResult';

const DEFAULT_RESULTS_PER_PAGE = 10;

const Search = function() {
  // Future work: enable user to specify results per page
  const [resultsPerPage] = useState(DEFAULT_RESULTS_PER_PAGE);
  const [results, setResults] = useState([]);
  const [starredResults, setStarredResults] = useState([]);

  const getQueryResults = useCallback(
    async event => {
      if (!event.target.value) {
        setResults([]);
        return;
      }

      const returnedResults = await getSearchResults({
        q: event.target.value,
        _limit: resultsPerPage,
        _page: 1,
      });
      setResults(returnedResults);
    },
    [resultsPerPage]
  );

  const getStarredResults = useCallback(async () => {
    const returnedResults = await getSearchResults({ starred: true });
    setStarredResults(returnedResults);
  }, []);

  const toggleIsResultStarred = useCallback(
    async item => {
      // TODO: Rework this so that the UI reflects the expected update immediately
      // and rolls it back if there is an error on save.
      const updatedItem = await patchSearchResult(item.id, { starred: !item.starred });

      // TODO: In an Ember app, the Ember store would update the target record on successful patch,
      // and the SearchItem component that renders that record would automatically update.
      // What is the right way to do this in React?
      const updatedResults = results.map(r => (r.id === item.id ? updatedItem : r));
      setResults(updatedResults);

      const updatedStarredResults = updatedItem.starred
        ? starredResults.concat(updatedItem)
        : starredResults.filter(r => r.id !== item.id);
      setStarredResults(updatedStarredResults);
    },
    [results, starredResults]
  );

  useEffect(() => {
    getStarredResults();
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
          onChange={getQueryResults}
        />
        <div>
          <strong>Starred Results: </strong>
          {starredResults.length}
        </div>
      </Box>

      <Box flex="1" p={3} className="u-scrollable">
        {results.map(item => (
          <Box mb={1.5}>
            <SearchResult key={item.id} item={item} toggleIsStarred={toggleIsResultStarred} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Search;
