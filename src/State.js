import { renderFeedsTitles, renderFeedsItems } from './renderFeed';

export default class {
  constructor() {
    this.currentUrl = '';
    this.urls = [];
    this.feedsTitlesTree = [];
    this.feedsItemsTree = [];
    this.isValid = true;
    this.errorMassege = '';
  }

  addFeedTitle(title) {
    this.feedsTitlesTree.push(title);
  }

  addFeedItem(item) {
    this.feedsItemsTree.push(item);
  }

  render() {
    if (!this.isValid) {
      return this.errorMassege;
    }

    const feedsTitles = renderFeedsTitles(this.feedsTitlesTree);

    const feedsItems = renderFeedsItems(this.feedsItemsTree);

    return `<div class="feeds">
      <div class="feeds-titles jumbotron">
        <h2>Feeds</h2>
        ${feedsTitles}
      </div>
      <div class="feeds-items jumbotron">
        <h2>List</h2>
        ${feedsItems}
      </div>
    </div>`;
  }
}
