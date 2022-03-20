const plugin = require("../index");

describe("fastify-fingerprint", () => {
  it("Should works with defauls", () => {
    const next = jest.fn();
    const fastify = {
      decorateRequest: jest.fn(),
      addHook: jest.fn(),
    };

    // Run the plugin
    plugin(fastify, undefined, next);

    // Default calls
    expect(next.mock.calls.length).toBe(1);
    expect(fastify.decorateRequest.mock.calls.length).toBe(1);
    expect(fastify.addHook.mock.calls.length).toBe(1);

    // Default values
    expect(fastify.decorateRequest.mock.calls[0][0]).toBe("fingerprint");
    expect(fastify.addHook.mock.calls[0][0]).toBe("preValidation");
  });

  it("Should customize the request key", () => {
    const next = jest.fn();
    const fastify = {
      decorateRequest: jest.fn(),
      addHook: jest.fn(),
    };

    // Run the plugin
    plugin(
      fastify,
      {
        requestKey: "foo",
      },
      next
    );

    // Default calls
    expect(next.mock.calls.length).toBe(1);
    expect(fastify.decorateRequest.mock.calls.length).toBe(1);
    expect(fastify.addHook.mock.calls.length).toBe(1);

    // Default values
    expect(fastify.decorateRequest.mock.calls[0][0]).toBe("foo");
  });

  it("Should actually work", () => {
    const request = {
      headers: {
        "user-agent": "foobar",
      },
    };
    const hooks = {};

    // Create the Jest interface
    const next = jest.fn();
    const fastify = {
      decorateRequest: jest.fn((key, value) => {
        request[key] = value;
      }),
      addHook: jest.fn((key, value) => {
        hooks[key] = value;
      }),
    };

    // Run the plugin
    plugin(fastify, undefined, next);
    hooks.preValidation(request);

    // Validate
    expect(request.fingerprint.length).toBe(32);
  });
});
