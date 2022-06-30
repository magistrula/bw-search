import React, { useCallback, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { getSearchResults, patchSearchResult } from '../utils/queries';
import SearchResult from './SearchResult';

const Search = function () {
  // Future work: enable user to specify results per page
  const [resultsPerPage] = useState(10);
  const [results, setResults] = useState([]);
  const [starredSearchResults, setStarredSearchResults] = useState([]);

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
    await getSearchResults({ starred: true }).then(setStarredSearchResults);
  }, []);

  const toggleIsResultStarred = useCallback(
    async (result, isStarred) => {
      await patchSearchResult(result.id, { starred: isStarred });
      getStarredResults();
    },
    [getStarredResults]
  );

  useEffect(() => {
    getStarredResults();
  }, [getStarredResults]);

  return (
    <Box m={5}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <TextField variant="outlined" placeholder="Search..." onChange={getQueryResults} />
        <div>
          <strong>Starred Results: </strong>
          {starredSearchResults.length}
        </div>
      </Box>

      <Box mt={2}>
        {results.map(result => (
          <SearchResult key={result.id} result={result} toggleIsStarred={toggleIsResultStarred} />
        ))}
      </Box>
    </Box>
  );
};

export default Search;