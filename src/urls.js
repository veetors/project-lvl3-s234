const getUrl = () => {
  const rssInput = document.querySelector('.rss-input');
  const url = rssInput.value;
  const newUrl = new URL(url);

  return newUrl.href;
};

const updateUrls = (urls) => {
  try {
    const newUrl = getUrl();
    urls.push(newUrl);
  } catch (error) {
    console.log(error);
  }
};

export default updateUrls;
