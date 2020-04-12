let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('shadowOffsetY', () => {
  it('should have a default value', () => {
    expect(ctx.shadowOffsetY).toBe(0);
  });

  it('should ignore non finite values', () => {
    [Infinity, -Infinity, null, void 0, NaN].forEach((e) => {
      ctx.shadowOffsetY = e;
      expect(ctx.shadowOffsetY).toBe(0);
    });
  });

  it('should not ignore values that are within range', () => {
    [1, 10, '30', '10.2', '-3'].forEach((e) => {
      ctx.shadowOffsetY = e;
      expect(ctx.shadowOffsetY).toBe(Number(e));
    });
  });

  it('should save and restore values', () => {
    ctx.shadowOffsetY = 2;
    ctx.save();
    ctx.shadowOffsetY = 10;
    expect(ctx.shadowOffsetY).toBe(10);
    ctx.restore();
    expect(ctx.shadowOffsetY).toBe(2);
  });
});
