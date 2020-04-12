let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('miterLimit', () => {
  it('should have a default value', () => {
    expect(ctx.miterLimit).toBe(10);
  });

  it('should ignore non finite values', () => {
    [Infinity, -Infinity, null, void 0, NaN].forEach((e) => {
      ctx.miterLimit = e;
      expect(ctx.miterLimit).toBe(10);
    });
  });

  it('should ignore out of range values', () => {
    [-1, -10, -300, 0].forEach((e) => {
      ctx.miterLimit = e;
      expect(ctx.miterLimit).toBe(10);
    });
  });

  it('should not ignore values that are within range', () => {
    [1, 10, '30', '10.2'].forEach((e) => {
      ctx.miterLimit = e;
      expect(ctx.miterLimit).toBe(Number(e));
    });
  });

  it('should save and restore values', () => {
    ctx.miterLimit = 2;
    ctx.save();
    ctx.miterLimit = 10;
    expect(ctx.miterLimit).toBe(10);
    ctx.restore();
    expect(ctx.miterLimit).toBe(2);
  });
});
