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

  describe("Testing a full instance", () => {
    class Fastify {
      constructor() {
        this.hooks = {};
        this.request = {};

        this.decorateRequest = jest.fn((key, value) => {
          this.request[key] = value;
        });

        this.addHook = jest.fn((key, value) => {
          this.hooks[key] = value;
        });
      }

      // Fake the request lifecycle
      async fakeRequest(request = {}) {
        this.request = request;
        await this.hooks.preValidation(this.request);
        return this;
      }
    }

    const fakeRequest = (requestConfig, pluginConfig) => {
      const fastify = new Fastify();
      plugin(fastify, pluginConfig, () => {});
      return fastify.fakeRequest(requestConfig);
    };

    it("Should accept extended headers", async () => {
      const { request: rq1 } = await fakeRequest({
        headers: {
          "user-agent": "foobar",
          "x-foo": "hoho",
        },
      });

      const { request: rq2 } = await fakeRequest(
        {
          headers: {
            "user-agent": "foobar",
            "x-foo": "hoho",
          },
        },
        {
          extendHeaders: ["x-foo"],
        }
      );

      const { request: rq3 } = await fakeRequest(
        {
          headers: {
            "user-agent": "foobar",
            "x-foo": "haha",
          },
        },
        {
          extendHeaders: ["x-foo"],
        }
      );

      expect(rq1.fingerprint).not.toEqual(rq2.fingerprint);
      expect(rq2.fingerprint).not.toEqual(rq3.fingerprint);
    });
  });
});
