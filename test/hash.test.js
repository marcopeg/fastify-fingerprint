const hash = require("../src/hash");

describe("hash", () => {
  it("Should hash a String", () => {
    expect(hash("i").length).toBe(32);
  });
  it("Should hash a Number", () => {
    expect(hash(22).length).toBe(32);
    expect(hash(22.5).length).toBe(32);
    expect(hash(-1).length).toBe(32);
    expect(hash(0).length).toBe(32);
  });
  it("Should hash a Boolean", () => {
    expect(hash(true).length).toBe(32);
    expect(hash(false).length).toBe(32);
  });
  it("Should hash Undefined", () => {
    expect(hash(undefined).length).toBe(32);
  });
  it("Should hash Null", () => {
    expect(hash(null).length).toBe(32);
  });
  it("Should hash NaN", () => {
    expect(hash(NaN).length).toBe(32);
  });
  it("Should hash Array", () => {
    expect(
      hash(["aa", NaN, null, undefined, 0, 1, -1, 1.5, true, false]).length
    ).toBe(32);
  });
  it("Should hash Object", () => {
    expect(
      hash({
        string: "aa",
        nan: NaN,
        null: null,
        undefined: undefined,
        zero: 0,
        one: 1,
        minusOne: -1,
        onePointFive: 1.5,
        true: true,
        false: false,
      }).length
    ).toBe(32);
  });
});
