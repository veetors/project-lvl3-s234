import { getElement, getElements } from './generic';

const buildItemTree = (data) => {
  const title = getElement(data, 'channel > title');
  const description = getElement(data, 'channel > description');
  const itemTitles = getElements(data, 'item > title');
  const itemLinks = getElements(data, 'item > link');
  const itemDescriptions = getElements(data, 'item > description');

  const children = itemTitles.map((elem, index) =>
    ({
      itemTitle: elem,
      itemLink: itemLinks[index],
      itemDescription: itemDescriptions[index],
    }));

  return { title, description, children };
};

const buildFeedsTree = data => data.map(buildItemTree);

export default buildFeedsTree;
