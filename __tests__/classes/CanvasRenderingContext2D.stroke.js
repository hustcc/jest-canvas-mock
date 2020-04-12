let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
  ctx.setTransform(1, 2, 3, 4, 5, 6);
});

describe('stroke', () => {
  it('should be a function', () => {
    expect(typeof ctx.stroke).toBe('function');
  });

  it('should be callable', () => {
    ctx.stroke();
    expect(ctx.stroke).toBeCalled();
  });

  it('should accept a path parameter', () => {
    expect(() => ctx.stroke(new Path2D())).not.toThrow();
  });

  it('should throw if an arguments is passed to it and it is not a Path2D', () => {
    [1, Infinity, 'test', null, void 0, [], {}].forEach((e) => {
      expect(() => ctx.stroke(e)).toThrow(TypeError);
    });
  });
});
