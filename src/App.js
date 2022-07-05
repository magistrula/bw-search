import React, { useReducer } from 'react';

import AppContext from './contexts/AppContext';
import FlashMessage from './components/FlashMessage';
import reducer, { initialState } from './reducers/app';
import Search from './components/Search';
import './App.css';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const appState = { state, dispatch };

  return (
    <>
      <AppContext.Provider value={appState}>
        <Search />
        <FlashMessage />
      </AppContext.Provider>
    </>
  );
}

export default App;
