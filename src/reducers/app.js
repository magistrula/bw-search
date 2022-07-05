import combineReducers from 'react-combine-reducers';

import flashReducer, { initialState as initialFlashState } from './flash';
import searchReducer, { initialState as initialSearchState } from './search';

const [reducerCombined, initialStateCombined] = combineReducers({
  flash: [flashReducer, initialFlashState()],
  search: [searchReducer, initialSearchState()],
});

export const initialState = initialStateCombined;
export default reducerCombined;
