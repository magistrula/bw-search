import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import ClipLoader from 'react-spinners/ClipLoader';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';

const Header = styled(Box)`
  height: 60px;
`;
const ItemFetchIndicator = styled(Box)`
  width: 20px;
`;
const QueryInputField = styled(TextField)`
  min-width: 100px;
`;
const StarredItemCount = styled(Box)`
  width: 15px;
`;

const SearchHeader = function ({
  changeSearchTerm,
  enableSearch,
  isFetchingItems,
  isFetchingStarredItems,
  isFilteredByStarred,
  isSearchEnabled,
  numStarredItems,
  queryTerm,
  showAllStarredItems,
  toggleFilterByStarred,
}) {
  return (
    <Header
      px={2}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      className="u-bgBlue u-borderBottom"
    >
      {isSearchEnabled && (
        <Box display="flex" alignItems="center">
          <ItemFetchIndicator mr={2} display="flex" alignItems="center">
            <ClipLoader size={15} color="#1976d2" loading={isFetchingItems} />
            {!isFetchingItems && <EmojiEmotionsIcon color="primary" />}
          </ItemFetchIndicator>

          <QueryInputField
            variant="outlined"
            size="small"
            placeholder="Search for ..."
            value={queryTerm}
            inputProps={{ 'data-testid': 'SearchHeader-searchTermInput' }}
            onChange={changeSearchTerm}
          />

          <Box
            ml={1}
            display="flex"
            alignItems="center"
            className="u-cursorPointer"
            onClick={toggleFilterByStarred}
            data-testid="SearchHeader-starredOnlyToggle"
          >
            <Checkbox
              checkedIcon={<StarIcon />}
              icon={<StarBorderOutlinedIcon />}
              checked={isFilteredByStarred}
            />
            <div className="u-hiddenXs">Starred Only</div>
          </Box>
        </Box>
      )}

      {!isSearchEnabled && (
        <Button onClick={enableSearch} data-testid="SearchHeader-returnToSearch">
          Return to Search
        </Button>
      )}

      <Box ml={3}>
        <Button
          variant="contained"
          size="small"
          onClick={showAllStarredItems}
          data-testid="SearchHeader-starredItems"
        >
          <Box mr={1}>Starred:</Box>
          <StarredItemCount display="flex" alignItems="center" justifyContent="center">
            <ClipLoader size={11.5} color="white" loading={isFetchingStarredItems} />
            <div data-testid="SearchHeader-starredItemsCount">
              {!isFetchingStarredItems && numStarredItems}
            </div>
          </StarredItemCount>
        </Button>
      </Box>
    </Header>
  );
};

SearchHeader.propTypes = {
  changeSearchTerm: PropTypes.func.isRequired,
  enableSearch: PropTypes.func.isRequired,
  isFetchingItems: PropTypes.bool,
  isFetchingStarredItems: PropTypes.bool,
  isFilteredByStarred: PropTypes.bool.isRequired,
  isSearchEnabled: PropTypes.bool.isRequired,
  numStarredItems: PropTypes.number.isRequired,
  queryTerm: PropTypes.string.isRequired,
  toggleFilterByStarred: PropTypes.func.isRequired,
};

export default SearchHeader;
