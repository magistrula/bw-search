import PageObject from '../test-utils/PageObject.js';

const TEST_IDS = {
  DESCRIPTION_TEXT: 'SearchResult-description',
  IDENTITY_DETAIL_TEXT: 'SearchResult-identityDetail',
  IDENTITY_TEXT: 'SearchResult-identity',
  IS_STARRED_ICON: 'SearchResult-isStarredIcon',
  ITEM_MODAL: 'SearchResult-modal',
  MAIN_STAR_ICON: 'SearchResult-starIcon',
  MODAL_STAR_ICON: 'SearchResult-modalStarIcon',
  SEARCH_RESULT: 'SearchResult',
};

export default class SearchResultPO extends PageObject {
  // ITEM

  get identityText() {
    return this.textForTestId(TEST_IDS.IDENTITY_TEXT);
  }

  get identityDetailText() {
    return this.textForTestId(TEST_IDS.IDENTITY_DETAIL_TEXT);
  }

  get descriptionText() {
    return this.textForTestId(TEST_IDS.DESCRIPTION_TEXT);
  }

  get isItemStarred() {
    return this.isTestIdVisible(TEST_IDS.IS_STARRED_ICON);
  }

  toggleIsStarred() {
    this.fireEventOnTestId('hover', TEST_IDS.MAIN_STAR_ICON);
    this.clickByTestId(TEST_IDS.MAIN_STAR_ICON);
  }

  openModal() {
    this.clickByTestId(TEST_IDS.SEARCH_RESULT);
  }

  // ITEM MODAL

  get isModalOpen() {
    return this.isTestIdVisible(TEST_IDS.ITEM_MODAL);
  }

  get modalIdentityText() {
    return this.textForTestId(TEST_IDS.MODAL_IDENTITY_TEXT);
  }

  get modalIdentityDetailText() {
    return this.textForTestId(TEST_IDS.MODAL_IDENTITY_DETAIL_TEXT);
  }

  get modalDescriptionText() {
    return this.textForTestId(TEST_IDS.MODAL_DESCRIPTION_TEXT);
  }

  toggleIsStarredViaModal() {
    this.clickByTestId(TEST_IDS.MODAL_STAR_ICON);
  }
}
