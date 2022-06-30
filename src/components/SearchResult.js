import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import AnimalDetails from './AnimalDetails';
import CompanyDetails from './CompanyDetails';
import ProductDetails from './ProductDetails';
import styles from './SearchResult.module.css';

const SearchResult = function ({ result, toggleIsStarred }) {
  const [isStarred, setIsStarred] = useState(result.starred);

  const toggleIsStarredCb = useCallback(async () => {
    const oldValue = isStarred;
    const newValue = !oldValue;
    setIsStarred(newValue);

    try {
      await toggleIsStarred(result, newValue);
    } catch (e) {
      setIsStarred(oldValue);
    }
  }, [result, toggleIsStarred, isStarred]);

  let resultComponent;

  if (result.type === 'animal') {
    resultComponent = (
      <AnimalDetails
        image={result.image}
        name={result.name}
        scientificName={result.scientificName}
      />
    );
  }

  if (result.type === 'company') {
    resultComponent = (
      <CompanyDetails
        address1={result.address.address1}
        address2={result.address.address2}
        city={result.address.city}
        postalCode={result.address.postalCode}
        state={result.address.state}
        description={result.description}
        name={result.name}
      />
    );
  }

  if (result.type === 'product') {
    resultComponent = (
      <ProductDetails
        category={result.category}
        image={result.image}
        name={result.name}
        previewText={result.previewText}
      />
    );
  }

  if (!resultComponent) {
    return null;
  }

  return (
    <Box
      py={2}
      px={3}
      onClick={toggleIsStarredCb}
      className={`u-cursorPointer ${isStarred ? styles.starred : ''}`}
    >
      {resultComponent}
    </Box>
  );
};

SearchResult.propTypes = {
  result: PropTypes.object.isRequired,
  toggleIsStarred: PropTypes.func.isRequired,
};

export default memo(SearchResult);
