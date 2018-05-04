import axios from 'axios';
import $ from 'jquery';

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

const showDescriptionModal = () => {
  $('#descriptionModal').on('show.bs.modal', function handler(event) {
    const button = $(event.relatedTarget);
    const descriptionData = button.data('description');
    const descriptionContent = descriptionData || 'No description for this link';
    const modal = $(this);
    modal.find('.modal-body').text(descriptionContent);
  });
};

const getFeedData = url => axios.get(url);

export { getTextContent, getElement, getElements, showError, showDescriptionModal, getFeedData };
