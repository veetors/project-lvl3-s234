const renderFeedList = (children) => {
  const listContent = children.map((child) => {
    const { itemTitle, itemLink } = child;

    return `<li class="list-group-item">
      <a href="${itemLink}">${itemTitle}</a>
    </li>`;
  }).join('');

  return `<ul class="list-group">${listContent}</ul>`;
};

const renderFeed = (feedTree) => {
  const { title, description, children } = feedTree;
  const feedList = renderFeedList(children);

  return `<div class="jumbotron">
    <h3>${title}</h3>
    <p>${description}</p>
    ${feedList}
  </div>`;
};

const render = (tree) => {
  const feeds = tree.map(node =>
    renderFeed(node))
    .join('');

  const newFeeds = `<div class="feeds">${feeds}</div>`;
  document.querySelector('.feeds-container').innerHTML = newFeeds;

  const rssInput = document.querySelector('.rss-input');
  rssInput.value = '';
};

export default render;
