const defaultHashFn = require("./hash");
const filterHeadersFn = require("./filter-headers");
const rewriteHeadersFn = require("./rewrite-headers");

module.exports = (
  headers = {},
  {
    acceptHeaders = undefined,
    extendHeaders = undefined,
    rewriteHeaders = undefined,
    acceptCookies = undefined,
    hashFn = defaultHashFn,
  } = {}
) => {
  const values = rewriteHeadersFn(
    filterHeadersFn(headers, {
      acceptHeaders,
      extendHeaders,
      acceptCookies,
    }),
    rewriteHeaders
  );

  return hashFn(values);
};
