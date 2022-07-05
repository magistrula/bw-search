const DEFAULT_FLASH_DURATION = 5000;
const DEFAULT_FLASH_SEVERITY = 'info';
const DEFAULT_ERROR_MESSAGE = 'Oops! Something went wrong.';

export function initialState() {
  return {
    duration: DEFAULT_FLASH_DURATION,
    isActive: false,
    message: '',
    severity: DEFAULT_FLASH_SEVERITY,
  };
}

const ACTION_HANDLERS = {
  FLASH_ERROR: (state, { message = DEFAULT_ERROR_MESSAGE, duration = DEFAULT_FLASH_DURATION }) => {
    return { ...state, message, duration, isActive: true, severity: 'error' };
  },

  FLASH_SUCCESS: (state, { message, duration = DEFAULT_FLASH_DURATION }) => {
    return { ...state, message, duration, isActive: true, severity: 'success' };
  },

  CLOSE_FLASH: (state, { message }) => {
    // Do not reset duration, message, severity on close; doing so will cause the flash
    // message to display in a weird state during the close transition.
    return { ...state, isActive: false };
  },
};

export default function reducer(state, action) {
  if (ACTION_HANDLERS[action.type]) {
    return ACTION_HANDLERS[action.type](state, action.payload || {});
  }

  return state;
}
