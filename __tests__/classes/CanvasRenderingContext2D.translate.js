let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('translate', () => {
  it('should be a function', () => {
    expect(typeof ctx.translate).toBe('function');
  });

  it('should be callable', () => {
    ctx.translate(1, 2);
    expect(ctx.translate).toBeCalled();
  });

  it('should translate the current transform', () => {
    ctx.translate(2, 3);
    expect(ctx.currentTransform).toEqual(new DOMMatrix([1, 0, 0, 1, 2, 3]));
  });

  it('should throw if argument count is less than 2', () => {
    expect(() => ctx.translate(1)).toThrow(TypeError);
  });

  it('should not translate the transform if any of the values cannot be coerced into finite numbers', () => {
    ctx.translate(1, Infinity);
    expect(ctx.currentTransform).toEqual(new DOMMatrix([1, 0, 0, 1, 0, 0]));

    ctx.translate(NaN, 2);
    expect(ctx.currentTransform).toEqual(new DOMMatrix([1, 0, 0, 1, 0, 0]));
  });
});
