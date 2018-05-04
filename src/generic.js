import axios from 'axios';

const getTextContent = elem => elem.textContent;

const getElement = (data, selector) => {
  const node = data.querySelector(selector);
  return getTextContent(node);
};

const getElements = (data, selector) => {
  const nodes = data.querySelectorAll(selector);
  return [...nodes].map(getTextContent);
};

const showError = (error) => {
  const rssInput = document.querySelector('.rss-input');
  const errorEl = document.querySelector('.invalid-feedback');
  errorEl.textContent = error;
  rssInput.classList.add('is-invalid');
};

const getFeedData = url => axios.get(url);

export { getTextContent, getElement, getElements, showError, getFeedData };
