import axios from 'axios';
import $ from 'jquery';

export const getInputValue = () => {
  const rssInput = document.querySelector('.rss-input');
  return rssInput.value;
};

export const getTextContent = elem => elem.textContent;

export const getElement = (data, selector) => {
  const node = data.querySelector(selector);
  return getTextContent(node);
};

export const getElements = (data, selector) => {
  const nodes = data.querySelectorAll(selector);
  return [...nodes].map(getTextContent);
};

export const showDescriptionModal = () => {
  $('#descriptionModal').on('show.bs.modal', function handler(event) {
    const button = $(event.relatedTarget);
    const descriptionData = button.data('description');
    const descriptionContent = descriptionData || 'No description for this link';
    const modal = $(this);
    modal.find('.modal-body').text(descriptionContent);
  });
};

export const getFeedData = url => axios.get(url);
