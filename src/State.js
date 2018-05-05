import renderFeed from './renderFeed';

export default class {
  constructor() {
    this.currentUrl = '';
    this.urls = [];
    this.feedsTree = [];
    this.isValid = true;
    this.errorMassege = '';
  }

  render() {
    if (!this.isValid) {
      return this.errorMassege;
    }
    const feeds = this.feedsTree.map(node =>
      renderFeed(node))
      .join('');

    return `<div class="feeds">${feeds}</div>`;
  }
}
