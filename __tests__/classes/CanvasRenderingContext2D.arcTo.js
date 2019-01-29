var canvas;
var ctx;

beforeEach(() => {
  canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = 400;
  canvas.height = 300;
});

describe("arcTo", () => {
  it("should be a function", () => {
    expect(typeof ctx.arcTo === "function").toBeTruthy();
  });

  it("should be callable", () => {
    ctx.arcTo(1, 2, 3, 4, 5);
    expect(ctx.arcTo).toBeCalled();
  });

  it("shouldn't accept parameters less than 5", () => {
    expect(() => ctx.arcTo(1, 2, 3)).toThrow(TypeError);
  });

  it("should throw when radius is negative", () => {
    expect(() => ctx.arcTo(1, 2, -1, 3, -1)).toThrow(TypeError);
  });

  it("should accept 5 parameters regardless of type", () => {
    [
      [1, 2, 3, 4, 5],
      [null, void 0, "", NaN, Infinity],
      [-100, -100, 100, 0, 0],
    ].forEach(e => {
      expect(() => ctx.arcTo(...e)).not.toThrow();
    });
  });

  it("should not throw for negative radius values if either control point is not a valid point", () => {
    [
      [NaN, 1, 2, 3, -1],
      [1, NaN, 2, 3, -1],
      [1, 2, NaN, 3, -1],
      [1, 2, 3, NaN, -1],
    ].forEach(e => {
      expect(() => ctx.arcTo(...e)).not.toThrow();
    });
  });
})