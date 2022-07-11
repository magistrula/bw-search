/**
 * @jest-environment jsdom
 */

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render, waitFor } from '@testing-library/react';

import AppContext from '../contexts/AppContext';
import { axiosInstance } from '../queries/base';
import Search from './Search';
import SearchPO from './Search.po';

const FOO_LLAMA = {
  id: 'animal-1',
  type: 'animal',
  name: 'Foo Llama',
  image: null,
  starred: false,
  taxonomy: {},
};
const FOO_IGUANA = {
  id: 'animal-2',
  type: 'animal',
  name: 'Foo Iguana',
  image: null,
  starred: false,
  taxonomy: {},
};

function mockSearchQuery(axiosInstance, { searchResults = [], starred = [] }) {
  axiosInstance.get.mockImplementation(url => {
    let data;
    if (/search\?starred=true/.test(url)) {
      data = starred;
    } else if (/search\?q=/.test(url)) {
      data = searchResults;
    } else {
      throw new Error('Unexpected query');
    }

    return Promise.resolve({ data });
  });
}

function doRender() {
  const queryClient = new QueryClient();
  const appState = { dispatch: jest.fn() };

  const { container } = render(
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={appState}>
        <Search />
      </AppContext.Provider>
    </QueryClientProvider>
  );

  return new SearchPO({ scope: container });
}

beforeEach(() => {
  jest.spyOn(axiosInstance, 'get');
  mockSearchQuery(axiosInstance, { searchResults: [], starred: [] });
});

describe('on initial load', () => {
  it('fetches starred results', () => {
    doRender();

    expect(axiosInstance.get).toHaveBeenCalledWith('/search?starred=true');
  });

  it('shows the number of starred items', async () => {
    mockSearchQuery(axiosInstance, { starred: [FOO_IGUANA, FOO_LLAMA]});

    const view = doRender();

    await waitFor(() => {
      expect(view.starredItemsCount).toEqual('2');
    });
  });

  it('does not fetch search results', () => {
    doRender();

    expect(axiosInstance.get).not.toHaveBeenCalledWith(expect.stringMatching(/q=/));
  });

  it('shows no search results', async () => {
    const view = doRender();

    expect(view.itemTitles).toEqual([]);
  });
});

describe('when a query term is available', () => {
  it('fetches results when input text changes', async () => {
    const view = doRender();
    view.changeSearchTerm('foo');

    expect(axiosInstance.get).toHaveBeenCalledWith(expect.stringMatching(/q=foo/));
  });

  it('displays fetched results', async () => {
    mockSearchQuery(axiosInstance, {
      searchResults: [FOO_IGUANA, FOO_LLAMA],
      starred: [FOO_LLAMA],
    });

    const view = doRender();
    view.changeSearchTerm('foo');

    await waitFor(() => {
      expect(view.itemTitles).toEqual([FOO_IGUANA.name, FOO_LLAMA.name]);
    });
  });
});
