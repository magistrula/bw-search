import React, { useReducer } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query';

import AppContext from './contexts/AppContext';
import FlashMessage from './components/FlashMessage';
import reducer, { initialState } from './reducers/app';
import Search from './components/Search';
import theme from './themes/app';
import './App.css';

const queryClient = new QueryClient();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const appState = { state, dispatch };

  return (
    <>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AppContext.Provider value={appState}>
            <Search />
            <FlashMessage />
          </AppContext.Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
