var canvas;
var ctx;

beforeEach(() => {
  canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = 400;
  canvas.height = 300;
});

describe("arc", () => {
  it("should be a function", () => {
    expect(typeof ctx.arc === "function").toBeTruthy();
  });

  it("should be callable", () => {
    ctx.arc(1, 2, 3, 4, 5);
    expect(ctx.arc).toBeCalled();
  });

  it("shouldn't accept parameters less than 5", () => {
    expect(() => ctx.arc(1, 2, 3)).toThrow(TypeError);
  });

  it("should throw when radius is negative", () => {
    expect(() => ctx.arc(1, 2, -1, 3, 4)).toThrow(TypeError);
  });

  it("should accept 5 parameters regardless of type", () => {
    [
      [1, 2, 3, 4, 5],
      [null, void 0, "", NaN, Infinity],
      [-100, -100, 100, 0, 0, true],
    ].forEach(e => {
      expect(() => ctx.arc(...e)).not.toThrow();
    });
  });

  it("should not throw for negative radius values if x or y aren't finite numbers", () => {
    expect(() => ctx.arc(1, NaN, -1, 0, Math.PI)).not.toThrow();
  });

});