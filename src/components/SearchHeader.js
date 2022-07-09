import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';

import styles from './SearchHeader.module.css';

const SearchHeader = function ({
  changeSearchTerm,
  enableSearch,
  isFilteredByStarred,
  isSearchEnabled,
  numStarredItems,
  queryTerm,
  showAllStarredItems,
  toggleFilterByStarred,
}) {
  return (
    <Box
      px={3}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      className={['u-bgBlue', 'u-borderBottom', styles['SearchHeader']]}
    >
      <Box display="flex" alignItems="center">
        {isSearchEnabled && (
          <>
            <TextField
              className={styles['SearchHeader-inputField']}
              variant="outlined"
              size="small"
              placeholder="Search for ..."
              value={queryTerm}
              onChange={changeSearchTerm}
            />

            <Box
              ml={1}
              display="flex"
              alignItems="center"
              className="u-cursorPointer"
              onClick={toggleFilterByStarred}
            >
              <Checkbox
                checkedIcon={<StarIcon />}
                icon={<StarBorderOutlinedIcon />}
                checked={isFilteredByStarred}
              />
              <div className="u-hiddenXs">Starred Only</div>
            </Box>
          </>
        )}

        {!isSearchEnabled && <Button onClick={enableSearch}>Return to Search</Button>}
      </Box>

      <Button variant="contained" size="small" onClick={showAllStarredItems}>
        Starred: {numStarredItems}
      </Button>
    </Box>
  );
};

SearchHeader.propTypes = {
  changeSearchTerm: PropTypes.func.isRequired,
  enableSearch: PropTypes.func.isRequired,
  isFilteredByStarred: PropTypes.bool.isRequired,
  isSearchEnabled: PropTypes.bool.isRequired,
  numStarredItems: PropTypes.number.isRequired,
  queryTerm: PropTypes.string.isRequired,
  toggleFilterByStarred: PropTypes.func.isRequired,
};

export default SearchHeader;
