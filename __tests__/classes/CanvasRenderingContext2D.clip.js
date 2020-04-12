let canvas;
let ctx;
const p = new Path2D();
beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('clip', () => {
  it('should be a function', () => {
    expect(typeof ctx.clip).toBe('function');
  });

  it('should be callable', () => {
    ctx.clip();
    expect(ctx.clip).toBeCalled();
  });

  it('should clip paths', () => {
    expect(() => ctx.clip(p)).not.toThrow();
  });

  it('should throw if clipRule is not valid clipRule', () => {
    [null, 1, Infinity, NaN, void 0, 'bad!'].forEach((e) => {
      expect(() => ctx.clip(p, e)).toThrow(TypeError);
      expect(() => ctx.clip(e)).toThrow(TypeError);
    });
  });

  it('should accept valid fillRules', () => {
    ['evenodd', 'nonzero'].forEach((e) => {
      expect(() => ctx.clip(e)).not.toThrow();
      expect(() => ctx.clip(p, e)).not.toThrow();
    });
  });
});
