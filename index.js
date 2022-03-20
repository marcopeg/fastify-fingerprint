const fp = require("fastify-plugin");

const FINGERPRINT_HEADERS = [
  "connection",
  "host",
  "user-agent",
  "accept",
  "accept-encoding",
  "accept-language",
];

const defaultHashFn = require("./src/hash");
const filterHeaders = require("./src/filter-headers");

module.exports = fp(
  (
    fastify,
    {
      acceptHeaders = undefined,
      requestKey = "fingerprint",
      hashFn = defaultHashFn,
    } = {},
    next
  ) => {
    const preValidation = async (request) => {
      const values = filterHeaders(request.headers, acceptHeaders);
      request[requestKey] = hashFn(values);
    };

    fastify.decorateRequest(requestKey, null);
    fastify.addHook("preValidation", preValidation);

    next();
  }
);
