let canvas;
let ctx;
const elem = document.createElement('div');
const path = new Path2D();

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('drawFocusIfNeeded', () => {
  it('should be a function', () => {
    expect(typeof ctx.drawFocusIfNeeded).toBe('function');
  });

  it('should be callable', () => {
    ctx.drawFocusIfNeeded(path, elem);
    expect(ctx.drawFocusIfNeeded).toBeCalled();
  });

  it('should throw if first argument is not provided', () => {
    expect(() => ctx.drawFocusIfNeeded()).toThrow(TypeError);
  });

  it('should throw if first argument is not Element', () => {
    [1, NaN, Infinity, 'test', {}, []].forEach((e) => {
      expect(() => ctx.drawFocusIfNeeded(e)).toThrow(TypeError);
    });
  });

  it('should throw if two parameters are provided and the first parameter is not a path', () => {
    [1, NaN, Infinity, 'test', {}, []].forEach((e) => {
      expect(() => ctx.drawFocusIfNeeded(e, elem)).toThrow(TypeError);
    });
  });

  it('should not throw if two arguments are provided and they match the signature', () => {
    expect(() => ctx.drawFocusIfNeeded(path, elem)).not.toThrow();
  });
});
