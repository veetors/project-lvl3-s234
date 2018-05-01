import 'bootstrap/dist/css/bootstrap.min.css';
import updateUrls from './urls';
import parse from './parse';
import { validate, getFeedsData } from './generic';
import { createFeedItem, updateDom } from './dom';

const urls = [];

const main = (addresses) => {
  const rssButton = document.querySelector('.rss-button');

  const handler = () => {
    updateUrls(addresses);

    getFeedsData(urls)
      .then(res => res.map(parse))
      .then(data => data.map(createFeedItem))
      .then(nodes => updateDom(nodes));
  };

  validate(urls);

  rssButton.addEventListener('click', handler);
};

main(urls);

// 'http://cors-anywhere.herokuapp.com/http://lenta.ru/rss/news'
// 'http://cors-anywhere.herokuapp.com/http://lorem-rss.herokuapp.com/feed'
// 'http://ru.hexlet.io/blog.rss'
// 'https://itc.ua/feed/'
