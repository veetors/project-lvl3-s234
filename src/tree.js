import { getElement, getElements } from './generic';

const buildItemTree = (data) => {
  const itemTitles = getElements(data, 'item > title');
  const itemLinks = getElements(data, 'item > link');
  const itemDescriptions = getElements(data, 'item > description');
  const itemGuids = getElements(data, 'item > guid');

  return itemTitles.map((title, index) =>
    ({
      itemTitle: title,
      itemLink: itemLinks[index],
      itemDescription: itemDescriptions[index],
      itemGuid: itemGuids[index],
    }));
};

const buildFeedTree = (data) => {
  const title = getElement(data, 'channel > title');
  const description = getElement(data, 'channel > description');
  const children = buildItemTree(data);

  return { title, description, children };
};

export default buildFeedTree;
