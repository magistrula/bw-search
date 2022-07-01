import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import styles from './SearchResult.module.css';

const PLACEHOLDER_IMAGES = {
  animal: '/placeholder-animal.png',
  company: '/placeholder-company.png',
  product: '/placeholder-product.png',
};

const SearchResult = function({ item, toggleIsStarred }) {
  const toggleIsStarredCb = useCallback(() => {
    toggleIsStarred(item);
  }, [item, toggleIsStarred]);

  let col3Content, col4Content;

  if (item.type === 'animal') {
    col3Content = item.scientificName;
  } else if (item.type === 'company') {
    const { address } = item;
    col3Content = (
      <div className={styles['u-smallText']}>
        <div>{address.address1}</div>
        <div>{address.address2}</div>
        <div>{`${address.city}, ${address.state} ${address.postalCode}`}</div>
      </div>
    );
    col4Content = item.description;
  } else if (item.type === 'product') {
    col3Content = item.category;
    col4Content = item.previewText;
  } else {
    return null;
  }

  return (
    <Box
      py={0.5}
      px={3}
      display="flex"
      alignItems="center"
      className={[
        'u-cursorPointer',
        'u-bgHoverLavender',
        styles['SearchResult'],
        item.starred ? styles.isStarred : '',
      ]}
      onClick={toggleIsStarredCb}
    >
      <img
        width="50px"
        src={item.image || PLACEHOLDER_IMAGES[item.type]}
        alt={`search result of type "${item.type}"`}
      />
      <Box pl={2} className={styles['SearchResult-fixedCol']}>
        {item.name}
      </Box>
      <Box pl={2} className={styles['SearchResult-fixedCol']}>
        {col3Content}
      </Box>
      <Box pl={2} flexGrow={1} className={styles['SearchResult-smallText']}>
        {col4Content}
      </Box>
    </Box>
  );
};

SearchResult.propTypes = {
  item: PropTypes.object.isRequired,
  toggleIsStarred: PropTypes.func.isRequired,
};

export default memo(SearchResult);
