let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
  ctx.setTransform(1, 2, 3, 4, 5, 6);
});

describe('scale', () => {
  it('should be a function', () => {
    expect(typeof ctx.scale).toBe('function');
  });

  it('should be callable', () => {
    ctx.scale(1, 2);
    expect(ctx.scale).toBeCalled();
  });

  it('should scale the current transform', () => {
    ctx.scale(2, 3);
    expect(ctx.currentTransform).toEqual(new DOMMatrix([2, 4, 9, 12, 5, 6]));
  });

  it('should throw if argument count is less than 2', () => {
    expect(() => ctx.scale(1)).toThrow(TypeError);
  });

  it('should not scale the transform if any of the values cannot be coerced into finite numbers', () => {
    ctx.scale(1, Infinity);
    expect(ctx.currentTransform).toEqual(new DOMMatrix([1, 2, 3, 4, 5, 6]));

    ctx.scale(NaN, 2);
    expect(ctx.currentTransform).toEqual(new DOMMatrix([1, 2, 3, 4, 5, 6]));
  });
});
