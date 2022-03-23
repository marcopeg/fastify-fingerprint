const rewriteHeaders = require("../src/rewrite-headers");

describe("Rewrite Headers", () => {
  it("Should be immutable", () => {
    const originalHeaders = {
      a: "a",
      b: "b",
    };

    expect(rewriteHeaders(originalHeaders)).not.toBe(originalHeaders);
  });

  it("Should respect the original headers structure", () => {
    const originalHeaders = {
      a: "a",
      b: "b",
    };

    expect(rewriteHeaders(originalHeaders)).toMatchObject(originalHeaders);
  });

  it("Should affect the value of an existing header", () => {
    const originalHeaders = {
      a: "a",
      b: "b",
    };

    const modifiedHeaders = rewriteHeaders(originalHeaders, { a: "a1" });
    expect(modifiedHeaders).toMatchObject({
      a: "a1",
      b: "b",
    });
  });

  it("Should add new headers", () => {
    const originalHeaders = {
      a: "a",
      b: "b",
    };

    const modifiedHeaders = rewriteHeaders(originalHeaders, { c: "c" });
    expect(modifiedHeaders).toMatchObject({
      a: "a",
      b: "b",
      c: "c",
    });
  });
});
