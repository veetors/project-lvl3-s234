import { getTextContent } from './generic';

const buildItemTree = (data) => {
  const titleNode = data.querySelector('channel > title');
  const descriptionNode = data.querySelector('channel > description');
  const itemTitleNodes = data.querySelectorAll('item > title');
  const itemLinkNodes = data.querySelectorAll('item > link');
  const itemDescriptionNodes = data.querySelectorAll('item > description');

  const title = getTextContent(titleNode);
  const description = getTextContent(descriptionNode);
  const itemTitles = [...itemTitleNodes].map(getTextContent);
  const itemLinks = [...itemLinkNodes].map(getTextContent);
  const itemDescriptions = [...itemDescriptionNodes].map(getTextContent);

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
