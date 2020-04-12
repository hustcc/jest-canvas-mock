let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('resetTransform', () => {
  it('should be a function', () => {
    expect(typeof ctx.resetTransform).toBe('function');
  });

  it('should be callable', () => {
    ctx.resetTransform();
    expect(ctx.resetTransform).toBeCalled();
  });

  it('should reset the transform', () => {
    ctx.setTransform(1, 2, 3, 4, 5, 6);
    expect(ctx.currentTransform).toEqual(new DOMMatrix([1, 2, 3, 4, 5, 6]));
    ctx.resetTransform();
    expect(ctx.currentTransform).toEqual(new DOMMatrix([1, 0, 0, 1, 0, 0]));
  });
});
