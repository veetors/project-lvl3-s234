import renderFeed from './renderFeed';

export default class {
  constructor() {
    this.currentUrl = '';
    this.urls = [];
    this.feedsTree = [];
    this.isValid = true;
    this.errorMassege = '';
  }

  getUrls() {
    return this.urls;
  }

  getFeedsTree() {
    return this.feedsTree;
  }

  render() {
    if (!this.isValid) {
      return this.errorMassege;
    }
    const feeds = this.getFeedsTree().map(node =>
      renderFeed(node))
      .join('');

    return `<div class="feeds">${feeds}</div>`;
  }
}
