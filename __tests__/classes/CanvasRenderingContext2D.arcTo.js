let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('arcTo', () => {
  it('should be a function', () => {
    expect(typeof ctx.arcTo).toBe('function');
  });

  it('should be callable', () => {
    ctx.arcTo(1, 2, 3, 4, 5);
    expect(ctx.arcTo).toBeCalled();
  });

  it("shouldn't accept parameters less than 5", () => {
    expect(() => ctx.arcTo()).toThrow(TypeError);
    expect(() => ctx.arcTo(1)).toThrow(TypeError);
    expect(() => ctx.arcTo(1, 2)).toThrow(TypeError);
    expect(() => ctx.arcTo(1, 2, 3)).toThrow(TypeError);
    expect(() => ctx.arcTo(1, 2, 3, 4)).toThrow(TypeError);
  });

  it('should throw when radius is negative', () => {
    const fn = () => ctx.arcTo(1, 2, 3, 4, -1);
    expect(fn).toThrow(DOMException);
    expect(fn).toThrow('The radius provided (-1) is negative.');
  });

  it('should accept 5 parameters regardless of type', () => {
    [
      [1, 2, 3, 4, 5],
      [null, void 0, '', NaN, Infinity],
      [-100, -100, 100, 0, 0],
    ].forEach((e) => {
      expect(() => ctx.arcTo(...e)).not.toThrow();
    });
  });

  it('should not throw for negative radius values if either control point is not a valid point', () => {
    [
      [NaN, 1, 2, 3, -1],
      [1, NaN, 2, 3, -1],
      [1, 2, NaN, 3, -1],
      [1, 2, 3, NaN, -1],
    ].forEach((e) => {
      expect(() => ctx.arcTo(...e)).not.toThrow();
    });
  });
});
