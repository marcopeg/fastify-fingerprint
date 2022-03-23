const fp = require("fastify-plugin");
const fingerprintFn = require("./src/fingerprint");

// Export the plugin
module.exports = fp(
  (fastify, { requestKey = "fingerprint", ...options } = {}, next) => {
    const preValidation = async (request) => {
      request[requestKey] = fingerprintFn(request.headers, options);
    };

    fastify.decorateRequest(requestKey, null);
    fastify.addHook("preValidation", preValidation);

    next();
  }
);

// Export the API
module.exports.hash = fingerprintFn;
