const sortHeaders = require("../src/sort-headers");

describe("Sort Headers", () => {
  it("Should sort headers", () => {
    const originalHeaders = { b: "b", a: "a" };
    const sortedHeaders = sortHeaders(originalHeaders);

    expect(originalHeaders).not.toBe(sortedHeaders);
    expect(Object.keys(sortedHeaders)).not.toMatchObject(
      Object.keys(originalHeaders)
    );
  });

  it("Should return a new object in any case", () => {
    const originalHeaders = { b: "b", a: "a" };
    const sortedHeaders = sortHeaders(originalHeaders, false);

    expect(originalHeaders).not.toBe(sortedHeaders);
    expect(Object.keys(sortedHeaders)).toMatchObject(
      Object.keys(originalHeaders)
    );
  });
});
