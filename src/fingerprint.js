const defaultHashFn = require("./hash");
const filterHeadersFn = require("./filter-headers");
const rewriteHeadersFn = require("./rewrite-headers");
const sortHeadersFn = require("./sort-headers");

module.exports = (
  headers = {},
  {
    sortHeaders = false,
    acceptHeaders = undefined,
    extendHeaders = undefined,
    rewriteHeaders = undefined,
    acceptCookies = undefined,
    hashFn = defaultHashFn,
  } = {}
) => {
  const values = filterHeadersFn(
    sortHeadersFn(rewriteHeadersFn(headers, rewriteHeaders), sortHeaders),
    {
      acceptHeaders,
      extendHeaders,
      acceptCookies,
    }
  );

  return hashFn(values);
};
