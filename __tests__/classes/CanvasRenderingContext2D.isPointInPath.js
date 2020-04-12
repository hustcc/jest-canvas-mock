let canvas;
let ctx;
const p = new Path2D();

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('isPointInPath', () => {
  it('should be a function', () => {
    expect(typeof ctx.isPointInPath).toBe('function');
  });

  it('should be callable', () => {
    ctx.isPointInPath(1, 2);
    expect(ctx.isPointInPath).toBeCalled();
  });

  it('should throw if less than 2 arguments are provided', () => {
    expect(() => ctx.isPointInPath(1)).toThrow(TypeError);
    expect(() => ctx.isPointInPath()).toThrow(TypeError);
  });

  it('should always return false', () => {
    expect(ctx.isPointInPath(1, 2)).toBeFalsy();
    expect(ctx.isPointInPath(p, 1, 2)).toBeFalsy();
  });

  it('should throw if provided fillRule is not valid', () => {
    expect(() => ctx.isPointInPath(1, 2, 'wrong!')).toThrow(TypeError);
    expect(() => ctx.isPointInPath(p, 1, 2, 'wrong!')).toThrow(TypeError);
  });

  it('should accept valid fillRules', () => {
    expect(() => ctx.isPointInPath(1, 2, 'evenodd')).not.toThrow();
    expect(() => ctx.isPointInPath(1, 2, 'nonzero')).not.toThrow();
    expect(() => ctx.isPointInPath(p, 1, 2, 'evenodd')).not.toThrow();
    expect(() => ctx.isPointInPath(p, 1, 2, 'nonzero')).not.toThrow();
  });
});
