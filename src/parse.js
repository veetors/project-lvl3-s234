export default (xml) => {
  const parser = new DOMParser();
  return parser.parseFromString(xml.data, 'application/xml');
};
