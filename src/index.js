import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isURL, isEmpty } from 'validator';
import State from './State';
import { getInputValue, showDescriptionModal, getFeedData } from './generic';
import buildFeedTree from './tree';
import parse from './parse';

const appState = new State();

const updateDom = (value) => {
  const rssInput = document.querySelector('.rss-input');
  const rssButton = document.querySelector('.rss-button');
  if (appState.isValid) {
    rssInput.classList.remove('is-invalid');
    rssButton.disabled = false;
    if (value) {
      rssInput.value = '';
      document.querySelector('.feeds-container').innerHTML = value;
    }
  } else {
    const errorNode = document.querySelector('.invalid-feedback');
    errorNode.textContent = value;
    rssInput.classList.add('is-invalid');
    rssButton.disabled = true;
  }
};

const updateValidState = (massege) => {
  if (massege) {
    appState.isValid = false;
    appState.errorMassege = massege;
  } else {
    appState.isValid = true;
    appState.errorMassege = '';
  }
};

const validate = () => {
  const rssInput = document.querySelector('.rss-input');
  const inputValue = rssInput.value;
  const options = { protocols: ['http', 'https'], require_protocol: true };



  if (isEmpty(inputValue)) {
    updateValidState('Please, enter URL to feed');
    updateDom(appState.render());
  } else if (!isURL(inputValue, options)) {
    updateValidState('Invalid URL');
    updateDom(appState.render());
  } else if (appState.getUrls().includes(inputValue)) {
    updateValidState('Feed already exist');
    updateDom(appState.render());
  } else {
    updateValidState();
    updateDom();
  }
};

const updateUrls = (url) => {
  try {
    const porxyAddress = 'http://cors-anywhere.herokuapp.com/';
    const newUrl = new URL(url);
    appState.currentUrl = `${porxyAddress}${newUrl.href}`;
    appState.urls.push(newUrl.href);
  } catch (error) {
    updateValidState('Invalid URL');
    updateDom(appState.render());
  }
};

const init = () => {
  const inputValue = getInputValue();
  if (inputValue === '') {
    console.log('Please, enter URL to feed');
    updateValidState('Please, enter URL to feed');
    updateDom(appState.render());
  } else {
    updateUrls(inputValue);
    getFeedData(appState.currentUrl)
      .then(response => parse(response))
      .then(feedData => buildFeedTree(feedData))
      .then((feedTree) => {
        appState.feedsTree = [...appState.feedsTree, feedTree];
        updateDom(appState.render());
      })
      .catch(() => {
        updateValidState('Download error');
        updateDom(appState.render());
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
