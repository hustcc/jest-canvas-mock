var canvas;
var ctx;

beforeEach(() => {
  canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = 400;
  canvas.height = 300;
});

describe("ellipse", () => {
  it("should be a function", () => {
    expect(typeof ctx.ellipse === "function").toBeTruthy();
  });

  it("should be callable", () => {
    ctx.ellipse(1, 2, 3, 4, 5, 6, 7);
    expect(ctx.ellipse).toBeCalled();
  });

  it("shouldn't accept parameters less than 7", () => {
    expect(() => ctx.ellipse()).toThrow(TypeError);
    expect(() => ctx.ellipse(1)).toThrow(TypeError);
    expect(() => ctx.ellipse(1, 2,)).toThrow(TypeError);
    expect(() => ctx.ellipse(1, 2, 3)).toThrow(TypeError);
    expect(() => ctx.ellipse(1, 2, 3, 4)).toThrow(TypeError);
    expect(() => ctx.ellipse(1, 2, 3, 4, 5)).toThrow(TypeError);
    expect(() => ctx.ellipse(1, 2, 3, 4, 5, 6)).toThrow(TypeError);
  });

  it("should throw when radius is negative", () => {
    expect(() => ctx.ellipse(1, 2, -1, 4, 5, 6, 7)).toThrow(DOMException);
    expect(() => ctx.ellipse(1, 2, 3, -1, 5, 6, 7)).toThrow(DOMException);
  });

  it("should not throw if any value is `NaN`", () => {
    [
      [NaN, 2, 3, 4, 5, 6, 7],
      [1, NaN, 3, 4, 5, 6, 7],
      [1, 2, NaN, 4, 5, 6, 7],
      [1, 2, 3, NaN, 5, 6, 7],
      [1, 2, 3, 4, NaN, 6, 7],
      [1, 2, 3, 4, 5, NaN, 7],
      [1, 2, 3, 4, 5, 6, NaN],
    ].forEach(e => {
      expect(() => ctx.ellipse(...e)).not.toThrow();
    });
  });
});
