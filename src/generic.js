import axios from 'axios';
import isURL from 'validator/lib/isURL';

const validate = (urls) => {
  const rssInput = document.querySelector('.rss-input');
  const rssButton = document.querySelector('.rss-button');

  rssInput.addEventListener('input', () => {
    const inputValue = rssInput.value;
    const isValid = isURL(inputValue) && !urls.includes(inputValue);

    if (!isValid) {
      rssInput.classList.add('is-invalid');
      rssButton.disabled = true;
    } else {
      rssInput.classList.remove('is-invalid');
      rssButton.disabled = false;
    }
  });
};

const getTextContent = elem => elem.textContent;

const request = url => axios.get(url);

const getFeedsData = adreses => Promise.all(adreses.map(request));

export { validate, getTextContent, getFeedsData };
