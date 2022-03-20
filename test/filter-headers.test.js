const filterHeaders = require("../src/filter-headers");

describe("Filter Headers", () => {
  it("Should filter default headers", () => {
    const res = filterHeaders({
      connection: "a",
      host: "b",
      "user-agent": "c",
      accept: "d",
      "accept-encoding": "e",
      "accept-language": "f",
    });

    expect(res).toMatchObject(["a", "b", "c", "d", "e", "f"]);
  });

  it("Should keep the headers order", () => {
    const res = filterHeaders({
      "accept-language": "f",
      "accept-encoding": "e",
      accept: "d",
      "user-agent": "c",
      host: "b",
      connection: "a",
    });

    expect(res).toMatchObject(["f", "e", "d", "c", "b", "a"]);
  });

  it("Should accept custom filter", () => {
    const res = filterHeaders(
      {
        connection: "a",
        host: "b",
        "user-agent": "c",
        accept: "d",
        "accept-encoding": "e",
        "accept-language": "f",
      },
      {
        acceptHeaders: ["host", "accept"],
      }
    );

    expect(res).toMatchObject(["b", "d"]);
  });

  it("Should accept an extended list of headers", () => {
    const res = filterHeaders(
      {
        connection: "a",
        host: "b",
        "x-foo": "c",
      },
      {
        extendHeaders: ["x-foo"],
      }
    );

    expect(res).toMatchObject(["a", "b", "c"]);
  });

  it("Should add values from cookies", () => {
    const res = filterHeaders(
      {
        host: "a",
        Cookie: "b=b; c=c",
      },
      { acceptCookies: ["b"] }
    );

    expect(res).toMatchObject(["a", "b"]);
  });
});
