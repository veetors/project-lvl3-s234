import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isURL, isEmpty } from 'validator';
import { getInputValue, showError, showDescriptionModal, getFeedData } from './generic';
import buildFeedTree from './tree';
import parse from './parse';
import render from './render';

const appState = {
  currentUrl: '',
  urls: [],
  feedsTree: [],
  isValid: true,
};

const validate = () => {
  const rssInput = document.querySelector('.rss-input');
  const rssButton = document.querySelector('.rss-button');
  const inputValue = rssInput.value;
  const options = { protocols: ['http', 'https'], require_protocol: true };

  if (isEmpty(inputValue)) {
    appState.isValid = false;
    showError('Please, enter URL to feed');
  } else if (!isURL(inputValue, options)) {
    appState.isValid = false;
    showError('Invalid URL');
  } else if (appState.urls.includes(inputValue)) {
    appState.isValid = false;
    showError('Feed already exist');
  } else {
    appState.isValid = true;
    rssInput.classList.remove('is-invalid');
    rssButton.disabled = false;
  }
};

const updateUrls = (url) => {
  try {
    const newUrl = new URL(url);
    appState.currentUrl = newUrl.href;
    appState.urls.push(appState.currentUrl);
  } catch (error) {
    showError('Invalid URL');
    appState.isValid = false;
  }
};

const init = () => {
  const inputValue = getInputValue();
  if (inputValue === '') {
    showError('Please, enter URL to feed');
  } else {
    updateUrls(inputValue);
    getFeedData(appState.currentUrl)
      .then(response => parse(response))
      .then(feedData => buildFeedTree(feedData))
      .then((feedTree) => {
        appState.feedsTree = [...appState.feedsTree, feedTree];
        return appState.feedsTree;
      })
      .then(tree => render(tree))
      .catch(() => {
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
