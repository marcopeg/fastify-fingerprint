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

    expect(res).toMatchObject({
      headers: {
        connection: "a",
        host: "b",
        "user-agent": "c",
        accept: "d",
        "accept-encoding": "e",
        "accept-language": "f",
      },
      cookies: {},
    });
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

    expect(res).toMatchObject({
      headers: {
        "accept-language": "f",
        "accept-encoding": "e",
        accept: "d",
        "user-agent": "c",
        host: "b",
        connection: "a",
      },
      cookies: {},
    });
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

    expect(res).toMatchObject({
      headers: {
        host: "b",
        accept: "d",
      },
      cookies: {},
    });
  });

  it("Should accept an extended list of headers", () => {
    const res = filterHeaders(
      {
        connection: "a",
        "x-foo": "b",
      },
      {
        extendHeaders: ["x-foo"],
      }
    );

    expect(res).toMatchObject({
      headers: {
        connection: "a",
        "x-foo": "b",
      },
      cookies: {},
    });
  });

  it("Should add values from cookies", () => {
    const res = filterHeaders(
      {
        host: "a",
        Cookie: "b=b; c=c",
      },
      { acceptCookies: ["b"] }
    );

    expect(res).toMatchObject({
      headers: { host: "a" },
      cookies: { b: "b" },
    });
  });
});
