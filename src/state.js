import isURL from 'validator/lib/isURL';
import { getFeedsData } from './generic';
import buildFeedsTree from './tree';
import updateUrls from './urls';
import parse from './parse';
import render from './render';

export const appState = {
  urls: [],
  feedsData: [],
  isValid: true,
};

export const validate = () => {
  const rssInput = document.querySelector('.rss-input');
  const rssButton = document.querySelector('.rss-button');
  const inputValue = rssInput.value;

  appState.isValid = isURL(inputValue) && !appState.urls.includes(inputValue);

  if (appState.isValid) {
    rssInput.classList.remove('is-invalid');
    rssButton.disabled = false;
  } else {
    rssInput.classList.add('is-invalid');
    rssButton.disabled = true;
  }
};

export const init = () => {
  updateUrls(appState.urls);

  getFeedsData(appState.urls)
    .then((response) => {
      const data = response.map(parse);
      appState.feedsData = data;

      return appState.feedsData;
    })
    .then(feedsData => buildFeedsTree(feedsData))
    .then(tree => render(tree))
    .catch((error) => {
      console.log(error);
    });
};
