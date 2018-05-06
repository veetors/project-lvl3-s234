import { getElement, getElements } from './generic';

export const buildTitleTree = (data) => {
  console.log(data);
  const title = getElement(data, 'channel > title');
  const description = getElement(data, 'channel > description');

  return { title, description };
};

export const buildItemTree = (currentData) => {
  const feedLink = getElement(currentData, 'channel > link');
  const itemTitles = getElements(currentData, 'item > title');
  const itemLinks = getElements(currentData, 'item > link');
  const itemDescriptions = getElements(currentData, 'item > description');
  const itemGuids = getElements(currentData, 'item > guid');

  return itemTitles.map((title, index) =>
    ({
      feedLink,
      itemTitle: title,
      itemLink: itemLinks[index],
      itemDescription: itemDescriptions[index],
      itemGuid: itemGuids[index],
    }));
};
