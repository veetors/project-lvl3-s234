import 'bootstrap/dist/css/bootstrap.min.css';
import { appState, validate, init } from './state';


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
});
