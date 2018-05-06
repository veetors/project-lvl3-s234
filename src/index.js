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
      document.querySelector('.feeds-container').innerHTML = value;
    }
  } else {
    const errorNode = document.querySelector('.invalid-feedback');
    errorNode.textContent = value;
    rssInput.classList.add('is-invalid');
    rssButton.disabled = true;
  }
};

const updateValidateStatus = (massege) => {
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
    updateValidateStatus('Please, enter URL to feed');
    updateDom(appState.render());
  } else if (!isURL(inputValue, options)) {
    updateValidateStatus('Invalid URL');
    updateDom(appState.render());
  } else if (appState.urls.includes(inputValue)) {
    updateValidateStatus('Feed already exist');
    updateDom(appState.render());
  } else {
    updateValidateStatus();
    updateDom();
  }
};

const updateCurrentUrl = (value) => {
  try {
    const newUrl = new URL(value);
    appState.currentUrl = newUrl.href;
  } catch (error) {
    updateValidateStatus('Invalid URL');
    updateDom(appState.render());
  }
};

const updateUrls = (url) => {
  if (!appState.urls.includes(url)) {
    appState.urls.push(url);
  }
};

const updateFeedsTree = (url) => {
  const porxyAddress = 'http://cors-anywhere.herokuapp.com/';

  return getFeedData(`${porxyAddress}${url}`)
    .then((response) => {
      updateUrls(url);
      return parse(response);
    })
    .then(feedData => buildFeedTree(feedData))
    .then(feedTree => appState.feedsTree.push(feedTree));
};

const updateFeeds = (urls) => {
  appState.feedsTree = [];
  return Promise.all(urls.map(updateFeedsTree));
};

const init = () => {
  const inputValue = getInputValue();
  if (inputValue === '') {
    updateValidateStatus('Please, enter URL to feed');
    updateDom(appState.render());
  } else {
    updateCurrentUrl(inputValue);
    updateFeedsTree(appState.currentUrl)
      .then(() => {
        updateDom(appState.render());
      })
      .catch(() => {
        updateValidateStatus('Download error');
        updateDom(appState.render());
      });
  }
};

const intervalUpdateFeeds = (urls) => {
  setTimeout(() => {
    updateFeeds(urls)
      .then(() => {
        updateDom(appState.render());
      })
      .then(() => intervalUpdateFeeds(urls))
      .catch(() => {
        updateValidateStatus('Download error');
        updateDom(appState.render());
        setTimeout(() => {
          updateValidateStatus();
          updateDom(appState.render());
          intervalUpdateFeeds(urls);
        }, 10000);
      });
  }, 5000);
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
        rssInput.value = '';
      }
    }
  });

  rssButton.addEventListener('click', () => {
    if (appState.isValid) {
      init();
      rssInput.value = '';
    }
  });

  intervalUpdateFeeds(appState.urls);

  showDescriptionModal();
});
