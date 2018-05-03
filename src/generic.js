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

const request = url => axios.get(url);

const getFeedsData = adreses => Promise.all(adreses.map(request));

export { getTextContent, getElement, getElements, getFeedsData };
