let canvas;
let ctx;
const p = new Path2D();

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('isPointInStroke', () => {
  it('should be a function', () => {
    expect(typeof ctx.isPointInStroke).toBe('function');
  });

  it('should be callable', () => {
    ctx.isPointInStroke(1, 2);
    expect(ctx.isPointInStroke).toBeCalled();
  });

  it('should throw if less than 2 arguments are provided', () => {
    expect(() => ctx.isPointInStroke(1)).toThrow(TypeError);
    expect(() => ctx.isPointInStroke()).toThrow(TypeError);
  });

  it('should always return false', () => {
    expect(ctx.isPointInStroke(1, 2)).toBeFalsy();
    expect(ctx.isPointInStroke(p, 1, 2)).toBeFalsy();
  });
});
