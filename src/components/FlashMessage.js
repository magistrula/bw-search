import React, { useCallback } from 'react';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { closeFlash } from '../actions/flash';
import { useAppContext } from '../contexts/AppContext';

const FlashMessage = function () {
  const {
    dispatch,
    state: { flash },
  } = useAppContext();

  const handleClose = useCallback(
    (event, reason) => {
      if (reason !== 'clickaway') {
        dispatch(closeFlash());
      }
    },
    [dispatch]
  );

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={flash.duration}
      onClose={handleClose}
      open={flash.isActive}
    >
      <Alert onClose={handleClose} severity={flash.severity}>
        {flash.message}
      </Alert>
    </Snackbar>
  );
};

export default FlashMessage;
