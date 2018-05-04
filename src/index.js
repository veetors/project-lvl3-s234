import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import isURL from 'validator/lib/isURL';
import { showError, showDescriptionModal, getFeedData } from './generic';
import buildFeedsTree from './tree';
import parse from './parse';
import render from './render';

const appState = {
  currentUrl: '',
  urls: [],
  feedsData: [],
  isValid: true,
};

const getUrl = () => {
  const rssInput = document.querySelector('.rss-input');
  const url = rssInput.value;
  try {
    const newUrl = new URL(url);
    appState.currentUrl = newUrl.href;
  } catch (error) {
    console.log(error);
  }
};

const updateUrls = (url) => {
  appState.urls.push(url);
};

const validate = () => {
  const rssInput = document.querySelector('.rss-input');
  const rssButton = document.querySelector('.rss-button');
  const inputValue = rssInput.value;
  const options = { protocols: ['http', 'https'], require_protocol: true };

  appState.isValid = isURL(inputValue, options) && !appState.urls.includes(inputValue);

  if (appState.isValid) {
    rssInput.classList.remove('is-invalid');
    rssButton.disabled = false;
  } else {
    showError('Invalid URL');
  }
};

const init = () => {
  getUrl();
  const { currentUrl } = appState;
  updateUrls(currentUrl);
  if (currentUrl === '') {
    showError('Please, enter URL to feed');
  } else {
    getFeedData(appState.currentUrl)
      .then((response) => {
        const data = parse(response);
        appState.feedsData.push(data);

        return appState.feedsData;
      })
      .then(feedsData => buildFeedsTree(feedsData))
      .then(tree => render(tree))
      .catch((error) => {
        console.log(error);
        showError('Download error');
      });
  }
};


document.addEventListener('DOMContentLoaded', () => {
  const rssInput = document.querySelector('.rss-input');
  const rssButton = document.querySelector('.rss-button');

  rssInput.addEventListener('input', () => {
    validate();
  });

  rssInput.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (appState.isValid) {
        init();
      }
    }
  });

  rssButton.addEventListener('click', () => {
    if (appState.isValid) {
      init();
    }
  });

  showDescriptionModal();
});
