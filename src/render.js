const renderFeedList = (children, rootNode) => {
  const ulNode = document.createElement('ul');
  ulNode.classList.add('list-group');
  rootNode.append(ulNode);

  children.forEach((child) => {
    const liNode = document.createElement('li');
    liNode.classList.add('list-group-item');
    const linkNode = document.createElement('a');
    linkNode.textContent = child.itemTitle;
    linkNode.href = child.itemLink;
    liNode.append(linkNode);
    ulNode.append(liNode);
  });

  return rootNode;
};

const renderFeed = (feedTree) => {
  const rootNode = document.createElement('div');
  rootNode.classList.add('jumbotron');

  const feedTitleNode = document.createElement('h3');
  feedTitleNode.textContent = feedTree.title;
  rootNode.append(feedTitleNode);

  const descriptionNode = document.createElement('p');
  descriptionNode.textContent = feedTree.description;
  rootNode.append(descriptionNode);

  renderFeedList(feedTree.children, rootNode);

  return rootNode;
};

const render = (tree) => {
  const rssInput = document.querySelector('.rss-input');
  const newFeedsNode = document.createElement('div');
  newFeedsNode.classList.add('feeds');

  tree.forEach((node) => {
    const feedNode = renderFeed(node);
    newFeedsNode.prepend(feedNode);
  });

  document.querySelector('.feeds').replaceWith(newFeedsNode);

  rssInput.value = '';
};

export default render;
