const createFeedList = (data, rootNode) => {
  const ulNode = document.createElement('ul');
  ulNode.classList.add('list-group');
  rootNode.append(ulNode);

  const itemTitle = data.querySelectorAll('item > title');
  const itemLink = data.querySelectorAll('item > link');
  itemTitle.forEach((item, index) => {
    const liNode = document.createElement('li');
    liNode.classList.add('list-group-item');
    const linkNode = document.createElement('a');
    linkNode.textContent = item.textContent;
    linkNode.href = itemLink[index].textContent;
    liNode.append(linkNode);
    ulNode.append(liNode);
  });

  return rootNode;
};

const createFeedItem = (data) => {
  const rootNode = document.createElement('div');
  rootNode.classList.add('jumbotron');

  const feedTitle = data.querySelector('channel > title');
  const feedTitleNode = document.createElement('h3');
  feedTitleNode.textContent = feedTitle.textContent;
  rootNode.append(feedTitleNode);

  const description = data.querySelector('channel > description');
  const descriptionNode = document.createElement('p');
  descriptionNode.textContent = description.textContent;
  rootNode.append(descriptionNode);

  createFeedList(data, rootNode);

  return rootNode;
};

const updateDom = (nodes) => {
  const rssInput = document.querySelector('.rss-input');

  const newFeedsNode = document.createElement('div');
  newFeedsNode.classList.add('feeds');

  nodes.forEach(node => newFeedsNode.prepend(node));
  document.querySelector('.feeds').replaceWith(newFeedsNode);

  rssInput.value = '';
};

export { createFeedItem, updateDom };
