let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
  ctx.setTransform(1, 2, 3, 4, 5, 6);
});

describe('transform', () => {
  it('should be a function', () => {
    expect(typeof ctx.transform).toBe('function');
  });

  it('should be callable', () => {
    ctx.transform(1, 2, 3, 4, 5, 6);
    expect(ctx.transform).toBeCalled();
  });

  it('should transform the current transform', () => {
    ctx.transform(1, 2, 3, 4, 5, 6);
    expect(ctx.currentTransform).toEqual(
      new DOMMatrix([7, 10, 15, 22, 28, 40])
    );
  });

  it('should throw if argument count is less than 6', () => {
    expect(() => ctx.transform()).toThrow(TypeError);
    expect(() => ctx.transform(1)).toThrow(TypeError);
    expect(() => ctx.transform(1, 2)).toThrow(TypeError);
    expect(() => ctx.transform(1, 2, 3)).toThrow(TypeError);
    expect(() => ctx.transform(1, 2, 3, 4)).toThrow(TypeError);
    expect(() => ctx.transform(1, 2, 3, 4, 5)).toThrow(TypeError);
  });

  it('should not transform the transform if any of the values cannot be coerced into finite numbers', () => {
    [
      [NaN, 2, 3, 4, 5, 6],
      [1, NaN, 2, 3, 4, 5],
      [1, 2, NaN, 3, 4, 5],
      [1, 2, 3, NaN, 4, 5],
      [1, 2, 3, 4, NaN, 6],
      [1, 2, 3, 4, 5, NaN],
    ].forEach((e) => {
      ctx.transform(...e);
      expect(ctx.currentTransform).toEqual(new DOMMatrix([1, 2, 3, 4, 5, 6]));
    });
  });
});
