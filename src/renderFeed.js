const renderFeedTitle = (titleData) => {
  const { title, description } = titleData;
  return `<div>
    <h3>${title}</h3>
    <p>${description}</p>
  </div>`;
};

const renderFeedsTitles = (titlesTree) => {
  const listContent = titlesTree.map(renderFeedTitle).join('');
  return `<div>${listContent}</div>`;
};

const renderFeedItem = (itemData) => {
  const {
    feedLink,
    itemTitle,
    itemLink,
    itemDescription,
  } = itemData;

  return `<li class="list-group-item d-flex justify-content-between align-items-center">
      <div style="display: flex; flex-direction: column;">
        <a href="${feedLink}" style="font-size: 12px;">${feedLink}</a>
        <a href="${itemLink}">${itemTitle}</a>
      </div>
      <button type="button" class="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#descriptionModal" data-description="${itemDescription}">
        description
      </button>
    </li>`;
};

const renderFeedsItems = (itemsTree) => {
  const listContent = itemsTree.map(node => renderFeedItem(node)).join('');

  return `<ul class="list-group">${listContent}</ul>`;
};

export { renderFeedsTitles, renderFeedsItems };
