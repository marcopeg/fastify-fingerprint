const fp = require("fastify-plugin");
const defaultHashFn = require("./src/hash");
const filterHeadersFn = require("./src/filter-headers");
const rewriteHeadersFn = require("./src/rewrite-headers");

module.exports = fp(
  (
    fastify,
    {
      acceptHeaders = undefined,
      extendHeaders = undefined,
      rewriteHeaders = undefined,
      acceptCookies = undefined,
      requestKey = "fingerprint",
      hashFn = defaultHashFn,
    } = {},
    next
  ) => {
    const preValidation = async (request) => {
      const values = rewriteHeadersFn(
        filterHeadersFn(request.headers, {
          acceptHeaders,
          extendHeaders,
          acceptCookies,
        }),
        rewriteHeaders
      );

      request[requestKey] = hashFn(values);
    };

    fastify.decorateRequest(requestKey, null);
    fastify.addHook("preValidation", preValidation);

    next();
  }
);
