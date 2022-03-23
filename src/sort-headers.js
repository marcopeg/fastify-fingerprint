module.exports = (headers = {}, sort = true) => {
  const keys = Object.keys(headers);
  sort && keys.sort();

  return keys.reduce((acc, curr) => ({ ...acc, [curr]: headers[curr] }), {});
};
