import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

const PLACEHOLDER_IMAGE = '/logo192.png';

const ProductResult = function ({ category, image, name, previewText }) {
  return (
    <Box display="flex" alignItems="center">
      <Box>
        <img width="50px" src={image || PLACEHOLDER_IMAGE} alt="product search result" />
      </Box>
      <Box pl={2} flexGrow="1">
        {name}
      </Box>
      <Box pl={2} flexGrow="1">
        {category}
      </Box>
      <Box pl={2} flexGrow="1">
        {previewText}
      </Box>
    </Box>
  );
};

ProductResult.propTypes = {
  category: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  previewText: PropTypes.string,
};

export default memo(ProductResult);
