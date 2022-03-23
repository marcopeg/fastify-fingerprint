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
  const values = sortHeadersFn(
    rewriteHeadersFn(
      filterHeadersFn(headers, {
        acceptHeaders,
        extendHeaders,
        acceptCookies,
      }),
      rewriteHeaders
    ),
    sortHeaders
  );

  return hashFn(values);
};
