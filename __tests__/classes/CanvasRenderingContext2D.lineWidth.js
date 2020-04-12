let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('lineWidth', () => {
  it('should have a default lineWidth value', () => {
    expect(ctx.lineWidth).toBe(1);
  });

  it('should ignore non finite lineWidth values', () => {
    [Infinity, -Infinity, null, void 0, NaN].forEach((e) => {
      ctx.lineWidth = e;
      expect(ctx.lineWidth).toBe(1);
    });
  });

  it('should ignore out of range lineWidth values', () => {
    [-1, -10, -300, 0].forEach((e) => {
      ctx.lineWidth = e;
      expect(ctx.lineWidth).toBe(1);
    });
  });

  it('should not ignore lineWidth values that are within range', () => {
    [1, 10, '30', '10.2'].forEach((e) => {
      ctx.lineWidth = e;
      expect(ctx.lineWidth).toBe(Number(e));
    });
  });

  it('should save and restore lineWidth values', () => {
    ctx.lineWidth = 2;
    ctx.save();
    ctx.lineWidth = 10;
    expect(ctx.lineWidth).toBe(10);
    ctx.save();
    expect(ctx.lineWidth).toBe(10);
    ctx.restore();
    expect(ctx.lineWidth).toBe(10);
    ctx.restore();
    expect(ctx.lineWidth).toBe(2);
  });
});
