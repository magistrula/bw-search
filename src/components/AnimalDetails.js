import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

const PLACEHOLDER_IMAGE = '/placeholder-animal.png';

const AnimalResult = function ({ name, scientificName, image = PLACEHOLDER_IMAGE }) {
  return (
    <Box display="flex" alignItems="center">
      <Box>
        <img width="50px" src={image} alt="animal search result" />
      </Box>
      <Box pl={2} flexGrow="1">
        {name}
      </Box>
      <Box pl={2} flexGrow="2">
        {scientificName}
      </Box>
    </Box>
  );
};

AnimalResult.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  scientificName: PropTypes.string,
};

export default memo(AnimalResult);
