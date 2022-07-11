import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';

import { useItemIdentity, useItemIdentityDetail, useItemDescription } from '../hooks/search';

const PLACEHOLDER_IMAGES = {
  animal: '/placeholder-animal.png',
  company: '/placeholder-company.png',
  product: '/placeholder-product.png',
};

const ItemImg = styled.img`
  width: 50px;
`;

const Col2 = styled(Box)`
  @media (max-width: 599px) {
    flex-grow: 1;
  }
  @media (min-width: 600px) {
    min-width: 30%;
    max-width: 30%;
  }
`;

const Col3 = styled(Box)`
  min-width: 25%;
  max-width: 25%;
`;

const StarIconContainer = styled(Box)`
  visibility: ${props => (props.isStarred ? 'visible' : 'hidden')};
  .SearchResult:hover & {
    visibility: visible;
  }
`;

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
    if (isStarred) {
      setStarIcon(<StarIcon color="info" data-testid="SearchResult-isStarredIcon" />);
    } else {
      setStarIcon(<StarBorderOutlinedIcon color="info" />);
    }
  }, [isStarred]);

  return (
    <>
      <Box
        display="flex"
        className="SearchResult u-cursorPointer u-bgHoverLavender u-border u-borderRadius5"
        data-testid="SearchResult"
      >
        <Box display="flex" alignItems="center" flexGrow="1" py={1} pl={2} onClick={openModal}>
          <ItemImg
            src={item.image || PLACEHOLDER_IMAGES[item.type]}
            alt={`search result of type "${item.type}"`}
          />

          <Col2 pl={2} display="flex" alignItems="center" data-testid="SearchResult-identity">
            <Typography variant="bodyBold">{identity}</Typography>
          </Col2>

          <Col3
            pl={2}
            display="flex"
            alignItems="center"
            className="u-hiddenSm"
            data-testid="SearchResult-identityDetail"
          >
            <Typography variant="bodySmall">{identityDetail}</Typography>
          </Col3>

          <Box pl={2} flexGrow={1} className="u-hiddenXs" data-testid="SearchResult-description">
            <Typography variant="bodySmall">{description}</Typography>
          </Box>
        </Box>

        <StarIconContainer
          px={1}
          display="flex"
          alignItems="center"
          isStarred={isStarred}
          onClick={toggleIsStarredCb}
          data-testid="SearchResult-starIcon"
        >
          {starIcon}
        </StarIconContainer>
      </Box>

      <Modal open={isModalActive} onClose={closeModal}>
        <Box
          p={2}
          className="ModalBody ModalBody--small u-bgLavender"
          data-testid="SearchResult-modal"
        >
          <Box
            display="flex"
            alignItems="center"
            className="u-cursorPointer"
            onClick={toggleIsStarredCb}
          >
            <div data-testid="SearchResult-modalStarIcon">{starIcon}</div>
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
