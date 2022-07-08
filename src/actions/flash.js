export function flashError(message) {
  return {
    type: 'FLASH_ERROR',
    payload: { message },
  };
}

export function closeFlash() {
  return { type: 'CLOSE_FLASH' };
}
