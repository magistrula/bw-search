import PageObject from '../test-utils/PageObject.js';

import SearchHeaderPO from './SearchHeader.po';
import SearchResultPO from './SearchResult.po';

const TEST_IDS = {
  SEARCH_RESULT_ITEM: 'SearchResult',
};

export default class SearchPO extends PageObject {
  constructor() {
    super(...arguments);

    // Related Components
    this.header = new SearchHeaderPO({ scope: this.scope });
  }

  get items() {
    return this.collection(TEST_IDS.SEARCH_RESULT_ITEM, {
      PageObject: SearchResultPO,
    });
  }

  // Header
  // TODO: Come up with a way to alias properties & methods of
  // related components (e.g., this.header) to make the code below less verbose

  get starredItemsCount() {
    return this.header.starredItemsCount;
  }
  openStarredItemsView() {
    this.header.clickStarredItemsButton();
  }
  closeStarredItemsView() {
    this.header.clickReturnToSearch();
  }
  toggleStarredOnlyFilter() {
    this.header.clickStarredOnlyToggle();
  }
  changeSearchTerm(searchTerm) {
    this.header.changeSearchTerm(searchTerm);
  }

  // Items

  get itemTitles() {
    return this.items.map(item => item.identityText);
  }
  toggleIsItemStarred(itemTitle) {
    this._findItem(itemTitle).toggleIsStarred();
  }
  openItemModal(itemTitle) {
    this._findItem(itemTitle).openModal();
  }
  _findItem(itemTitle) {
    return this.items.find(item => item.identityText === itemTitle);
  }
}
