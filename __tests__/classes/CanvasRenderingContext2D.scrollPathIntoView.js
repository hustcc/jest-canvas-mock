let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('scrollPathIntoView', () => {
  it('should be a function', () => {
    expect(typeof ctx.scrollPathIntoView).toBe('function');
  });

  it('should be callable', () => {
    ctx.scrollPathIntoView();
    expect(ctx.scrollPathIntoView).toBeCalled();
  });

  it('should accept a path object', () => {
    expect(() => ctx.scrollPathIntoView(new Path2D())).not.toThrow();
  });
});
