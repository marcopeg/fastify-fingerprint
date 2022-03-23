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
        this.headers = {};
        this.reply = {
          header: jest.fn((key, val) => {
            this.headers[key] = val;
          }),
        };

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
        await this.hooks.preValidation(this.request, this.reply);
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

      expect(rq1.fingerprint.value).not.toEqual(rq2.fingerprint.value);
      expect(rq2.fingerprint.value).not.toEqual(rq3.fingerprint.value);
    });

    it("Should accept cookies", async () => {
      const { request: rq1 } = await fakeRequest({
        headers: {
          "user-agent": "foobar",
          Cookie: "a=a; b=b;",
        },
      });

      const { request: rq2 } = await fakeRequest(
        {
          headers: {
            "user-agent": "foobar",
            Cookie: "a=a; b=b;",
          },
        },
        { acceptCookies: ["a"] }
      );

      const { request: rq3 } = await fakeRequest(
        {
          headers: {
            "user-agent": "foobar",
            Cookie: "a=a1; b=b;",
          },
        },
        { acceptCookies: ["a"] }
      );

      expect(rq1.fingerprint.value).not.toEqual(rq2.fingerprint.value);
      expect(rq2.fingerprint.value).not.toEqual(rq3.fingerprint.value);
    });

    it("Should randomize a Header", async () => {
      const i1 = await fakeRequest(
        {
          headers: {
            "user-agent": "foobar",
            Cookie: "a=a; b=b;",
          },
        },
        {
          randomizeHeader: "x-rand",
        }
      );

      const i2 = await fakeRequest(
        {
          headers: {
            "user-agent": "foobar",
            Cookie: "a=a; b=b;",
            "x-rand": i1.headers["x-rand"],
          },
        },
        {
          randomizeHeader: "x-rand",
        }
      );

      expect(i1.request.fingerprint.next).toEqual(i2.request.fingerprint.value);

      // The position of the "x-rand" header should not inficiate the calculation of the hash!
      const i3 = await fakeRequest(
        {
          headers: {
            "x-rand": i2.headers["x-rand"],
            "user-agent": "foobar",
            Cookie: "a=a; b=b;",
          },
        },
        {
          randomizeHeader: "x-rand",
        }
      );

      expect(i2.request.fingerprint.next).toEqual(i3.request.fingerprint.value);
    });
  });
});
