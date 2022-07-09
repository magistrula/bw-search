import combineReducers from 'react-combine-reducers';

import flashReducer, { initialState as initialFlashState } from './flash';

const [reducerCombined, initialStateCombined] = combineReducers({
  flash: [flashReducer, initialFlashState()],
});

export const initialState = initialStateCombined;
export default reducerCombined;
