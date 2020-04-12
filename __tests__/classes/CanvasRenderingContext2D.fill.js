let canvas;
let ctx;
const p = new Path2D();
beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('fill', () => {
  it('should be a function', () => {
    expect(typeof ctx.fill).toBe('function');
  });

  it('should be callable', () => {
    ctx.fill();
    expect(ctx.fill).toBeCalled();
  });

  it('should fill paths', () => {
    expect(() => ctx.fill(p)).not.toThrow();
  });

  it('should throw if fillRule is not valid fillRule', () => {
    [null, 1, Infinity, NaN, void 0, 'bad!'].forEach((e) => {
      expect(() => ctx.fill(p, e)).toThrow(TypeError);
      expect(() => ctx.fill(e)).toThrow(TypeError);
    });
  });

  it('should accept valid fillRules', () => {
    ['evenodd', 'nonzero'].forEach((e) => {
      expect(() => ctx.fill(e)).not.toThrow();
      expect(() => ctx.fill(p, e)).not.toThrow();
    });
  });
});
