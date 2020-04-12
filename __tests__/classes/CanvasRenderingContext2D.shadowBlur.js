let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('shadowBlur', () => {
  it('should have a default value', () => {
    expect(ctx.shadowBlur).toBe(0);
  });

  it('should ignore non finite values', () => {
    [Infinity, -Infinity, null, void 0, NaN].forEach((e) => {
      ctx.shadowBlur = e;
      expect(ctx.shadowBlur).toBe(0);
    });
  });

  it('should ignore out of range values', () => {
    [-1, -10, -300].forEach((e) => {
      ctx.shadowBlur = e;
      expect(ctx.shadowBlur).toBe(0);
    });
  });

  it('should not ignore values that are within range', () => {
    [1, 10, '30', '10.2'].forEach((e) => {
      ctx.shadowBlur = e;
      expect(ctx.shadowBlur).toBe(Number(e));
    });
  });

  it('should save and restore values', () => {
    ctx.shadowBlur = 2;
    ctx.save();
    ctx.shadowBlur = 10;
    expect(ctx.shadowBlur).toBe(10);
    ctx.restore();
    expect(ctx.shadowBlur).toBe(2);
  });
});
