import PageObject from '../test-utils/PageObject.js';

const TEST_IDS = {
  RETURN_TO_SEARCH_BUTTON: 'SearchHeader-returnToSearch',
  SEARCH_TERM_INPUT: 'SearchHeader-searchTermInput',
  STARRED_ITEMS_BUTTON: 'SearchHeader-starredItems',
  STARRED_ITEMS_COUNT: 'SearchHeader-starredItemsCount',
  STARRED_ONLY_TOGGLE: 'SearchHeader-starredOnlyToggle',
};

export default class SearchHeaderPO extends PageObject {
  // SEARCH CONTROLS
  changeSearchTerm(value) {
    this.fireEventOnTestId('change', TEST_IDS.SEARCH_TERM_INPUT, {
      target: { value },
    });
  }

  toggleStarredOnlyFilter() {
    this.clickByTestId(TEST_IDS.STARRED_ONLY_TOGGLE);
  }

  // STARRED ITEMS BUTTON

  get starredItemsCount() {
    return this.textForTestId(TEST_IDS.STARRED_ITEMS_COUNT);
  }

  openStarredItemsView() {
    this.clickByTestId(TEST_IDS.STARRED_ITEMS_BUTTON);
  }

  closeStarredItemsView() {
    this.clickByTestId(TEST_IDS.RETURN_TO_SEARCH_BUTTON);
  }
}
