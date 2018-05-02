import 'bootstrap/dist/css/bootstrap.min.css';
import updateUrls from './urls';
import parse from './parse';
import { validate, getFeedsData } from './generic';
import buildFeedsTree from './tree';
import render from './render';

const urls = [];

const main = (addresses) => {
  const rssButton = document.querySelector('.rss-button');

  const handler = () => {
    updateUrls(addresses);

    getFeedsData(urls)
      .then(res => res.map(parse))
      .then(data => buildFeedsTree(data))
      .then(tree => render(tree));
  };

  validate(urls);

  rssButton.addEventListener('click', handler);
};

main(urls);

// 'http://cors-anywhere.herokuapp.com/http://lenta.ru/rss/news'
// 'http://cors-anywhere.herokuapp.com/http://lorem-rss.herokuapp.com/feed'
// 'http://ru.hexlet.io/blog.rss'