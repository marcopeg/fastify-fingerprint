const fp = require("fastify-plugin");
const defaultHashFn = require("./src/hash");
const filterHeaders = require("./src/filter-headers");

module.exports = fp(
  (
    fastify,
    {
      acceptHeaders = undefined,
      extendHeaders = undefined,
      requestKey = "fingerprint",
      hashFn = defaultHashFn,
    } = {},
    next
  ) => {
    const preValidation = async (request) => {
      const values = filterHeaders(
        request.headers,
        acceptHeaders,
        extendHeaders
      );
      request[requestKey] = hashFn(values);
    };

    fastify.decorateRequest(requestKey, null);
    fastify.addHook("preValidation", preValidation);

    next();
  }
);
