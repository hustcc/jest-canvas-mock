let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('shadowOffsetX', () => {
  it('should have a default value', () => {
    expect(ctx.shadowOffsetX).toBe(0);
  });

  it('should ignore non finite values', () => {
    [Infinity, -Infinity, null, void 0, NaN].forEach((e) => {
      ctx.shadowOffsetX = e;
      expect(ctx.shadowOffsetX).toBe(0);
    });
  });

  it('should not ignore values that are within range', () => {
    [1, 10, '30', '10.2', '-3'].forEach((e) => {
      ctx.shadowOffsetX = e;
      expect(ctx.shadowOffsetX).toBe(Number(e));
    });
  });

  it('should save and restore values', () => {
    ctx.shadowOffsetX = 2;
    ctx.save();
    ctx.shadowOffsetX = 10;
    expect(ctx.shadowOffsetX).toBe(10);
    ctx.restore();
    expect(ctx.shadowOffsetX).toBe(2);
  });
});
