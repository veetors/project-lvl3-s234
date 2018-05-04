import { getElement, getElements } from './generic';

const buildItemTree = (data) => {
  const itemTitles = getElements(data, 'item > title');
  const itemLinks = getElements(data, 'item > link');
  const itemDescriptions = getElements(data, 'item > description');

  return itemTitles.map((elem, index) =>
    ({
      itemTitle: elem,
      itemLink: itemLinks[index],
      itemDescription: itemDescriptions[index],
    }));
};

const buildFeedTree = (data) => {
  const title = getElement(data, 'channel > title');
  const description = getElement(data, 'channel > description');
  const children = buildItemTree(data);

  return { title, description, children };
};

export default buildFeedTree;
