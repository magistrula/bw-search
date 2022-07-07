import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';

import { useIdentity, useIdentityDetail, useDescription } from '../hooks/search';
import styles from './SearchResult.module.css';

const PLACEHOLDER_IMAGES = {
  animal: '/placeholder-animal.png',
  company: '/placeholder-company.png',
  product: '/placeholder-product.png',
};

const SearchResult = function ({ item, toggleIsStarred }) {
  const [starIcon, setStarIcon] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);

  const identity = useIdentity(item);
  const identityDetail = useIdentityDetail(item);
  const description = useDescription(item);

  const toggleIsStarredCb = useCallback(() => toggleIsStarred(item), [item, toggleIsStarred]);
  const openModal = useCallback(() => setIsModalActive(true), []);
  const closeModal = useCallback(() => setIsModalActive(false), []);

  useEffect(() => {
    const IconType = item.starred ? StarIcon : StarBorderOutlinedIcon;
    setStarIcon(<IconType color="info" />);
  }, [item.starred]);

  return (
    <>
      <Box
        display="flex"
        className={[
          'u-cursorPointer',
          'u-bgHoverLavender',
          styles['SearchResult'],
          item.starred ? styles.isStarred : '',
        ]}
      >
        <Box display="flex" alignItems="center" flexGrow="1" py={1} pl={2} onClick={openModal}>
          <img
            className={styles['SearchResult-image']}
            src={item.image || PLACEHOLDER_IMAGES[item.type]}
            alt={`search result of type "${item.type}"`}
          />
          <Box pl={2} className={styles['SearchResult-nameCol']}>
            {identity}
          </Box>
          <Box pl={2} className={['u-hiddenSm', 'u-smallText', styles['SearchResult-fixedCol']]}>
            {identityDetail}
          </Box>
          <Box pl={2} flexGrow={1} className={['u-hiddenXs', styles['SearchResult-smallText']]}>
            {description}
          </Box>
        </Box>

        <Box
          p={1}
          display="flex"
          alignItems="center"
          className={styles['SearchResult-starIcon']}
          onClick={toggleIsStarredCb}
        >
          {starIcon}
        </Box>
      </Box>

      <Modal open={isModalActive} onClose={closeModal}>
        <Box
          className={[
            'ModalBody',
            'u-bgLavender',
            'u-scrollable',
            styles['SearchResult-modalBody'],
          ]}
          p={2}
        >
          <Box
            display="flex"
            alignItems="center"
            className="u-cursorPointer"
            onClick={toggleIsStarredCb}
          >
            {starIcon}
            <Box ml={0.5}>
              <strong>{identity}</strong>
            </Box>
          </Box>
          {identityDetail && <Box mt={1.5}>{identityDetail}</Box>}
          {description && <Box mt={1.5}>{description}</Box>}

          <Box mt={3} display="flex" justifyContent="center">
            <Button variant="contained" size="small" onClick={closeModal}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

SearchResult.propTypes = {
  item: PropTypes.object.isRequired,
  toggleIsStarred: PropTypes.func.isRequired,
};

export default memo(SearchResult);
