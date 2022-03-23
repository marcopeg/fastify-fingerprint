const fp = require("fastify-plugin");
const defaultHashFn = require("./src/hash");
const filterHeaders = require("./src/filter-headers");

module.exports = fp(
  (
    fastify,
    {
      acceptHeaders = undefined,
      extendHeaders = [],
      acceptCookies = undefined,
      requestKey = "fingerprint",
      randomizeHeader = undefined,
      hashFn = defaultHashFn,
    } = {},
    next
  ) => {
    const preValidation = async (request, reply) => {
      const values = filterHeaders(request.headers, {
        acceptHeaders,
        extendHeaders: [
          ...extendHeaders,
          ...(randomizeHeader ? [randomizeHeader] : []),
        ],
        acceptCookies,
      });

      request[requestKey] = {
        value: hashFn(values),
      };

      if (randomizeHeader) {
        const randValue = Math.random();
        const nextValues = {
          ...values,
          headers: {
            ...values.headers,
            [randomizeHeader]: randValue,
          },
        };

        request[requestKey] = {
          value: hashFn(values),
          next: hashFn(nextValues),
        };

        reply.header(randomizeHeader, randValue);
      } else {
        request[requestKey] = {
          value: hashFn(values),
        };
      }
    };

    fastify.decorateRequest(requestKey, null);
    fastify.addHook("preValidation", preValidation);

    next();
  }
);
