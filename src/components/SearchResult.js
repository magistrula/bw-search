import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';

import { useItemIdentity, useItemIdentityDetail, useItemDescription } from '../hooks/search';
import styles from './SearchResult.module.css';

const PLACEHOLDER_IMAGES = {
  animal: '/placeholder-animal.png',
  company: '/placeholder-company.png',
  product: '/placeholder-product.png',
};

const SearchResult = function ({ item, toggleIsStarred }) {
  const [starIcon, setStarIcon] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isStarred, setIsStarred] = useState(item.starred);

  const identity = useItemIdentity(item);
  const identityDetail = useItemIdentityDetail(item);
  const description = useItemDescription(item);

  const toggleIsStarredCb = useCallback(() => {
    const originalIsStarred = isStarred;
    try {
      setIsStarred(!originalIsStarred);
      toggleIsStarred(item);
    } catch (e) {
      setIsStarred(originalIsStarred);
      throw e;
    }
  }, [isStarred, item, toggleIsStarred]);
  const openModal = useCallback(() => setIsModalActive(true), []);
  const closeModal = useCallback(() => setIsModalActive(false), []);

  useEffect(() => {
    const IconType = isStarred ? StarIcon : StarBorderOutlinedIcon;
    setStarIcon(<IconType color="info" />);
  }, [isStarred]);

  return (
    <>
      <Box
        display="flex"
        className={[
          'u-cursorPointer',
          'u-bgHoverLavender',
          styles['SearchResult'],
          isStarred ? styles.isStarred : '',
        ]}
      >
        <Box display="flex" alignItems="center" flexGrow="1" py={1} pl={2} onClick={openModal}>
          <img
            className={styles['SearchResult-image']}
            src={item.image || PLACEHOLDER_IMAGES[item.type]}
            alt={`search result of type "${item.type}"`}
          />
          <Box pl={2} className={styles['SearchResult-nameCol']}>
            <Typography variant="bodyBold">{identity}</Typography>
          </Box>
          <Box pl={2} className={['u-hiddenSm', styles['SearchResult-fixedCol']]}>
            <Typography variant="bodySmall">{identityDetail}</Typography>
          </Box>
          <Box pl={2} flexGrow={1} className="u-hiddenXs">
            <Typography variant="bodySmall">{description}</Typography>
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
              <Typography variant="bodyBold">{identity}</Typography>
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
