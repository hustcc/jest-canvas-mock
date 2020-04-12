let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('globalAlpha', () => {
  it('should ignore non finite globalAlpha values', () => {
    [Infinity, -Infinity, void 0, NaN].forEach((e) => {
      ctx.globalAlpha = e;
      expect(ctx.globalAlpha).toBe(1);
    });
  });

  it('should ignore out of range values', () => {
    [-1, 1.1].forEach((e) => {
      ctx.globalAlpha = e;
      expect(ctx.globalAlpha).toBe(1);
    });
  });

  it('should not ignore globalAlpha values that are within range', () => {
    [0.1, 0.2, 0.3, 0.4].forEach((e) => {
      ctx.globalAlpha = e;
      expect(ctx.globalAlpha).toBe(e);
    });
  });

  it('should be 0 when globalAlpha is set to null', () => {
    ctx.globalAlpha = null;
    expect(ctx.globalAlpha).toBe(0);
  });
});
