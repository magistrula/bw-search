import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

const PLACEHOLDER_IMAGE = '/logo192.png';

const CompanyResult = function ({
  address1,
  address2,
  city,
  state,
  postalCode,
  description,
  name,
}) {
  return (
    <Box display="flex" alignItems="center">
      <Box>
        <img width="50px" src={PLACEHOLDER_IMAGE} alt="company search result" />
      </Box>
      <Box pl={2} flexGrow="1">
        {name}
      </Box>
      <Box pl={2} flexGrow="1">
        <div>{address1}</div>
        <div>{address2}</div>
        <div>{`${city}, ${state} ${postalCode}`}</div>
      </Box>
      <Box pl={2} flexGrow="1">
        {description}
      </Box>
    </Box>
  );
};

CompanyResult.propTypes = {
  address1: PropTypes.string,
  address2: PropTypes.string,
  city: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string,
  postalCode: PropTypes.string,
  state: PropTypes.string,
};

export default memo(CompanyResult);
