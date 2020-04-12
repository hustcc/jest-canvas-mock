let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('lineDashOffset', () => {
  it('should have a default value of 0', () => {
    expect(ctx.lineDashOffset).toBe(0);
  });

  it('should cast js values to numbers and ignore non-finite values when setting the lineDashOffset property', () => {
    [0, 10, -Infinity, 'null', null, NaN].forEach((e) => {
      ctx.lineDashOffset = 0;
      ctx.lineDashOffset = e;
      const cast = Number(e);
      if (Number.isFinite(cast)) {
        expect(ctx.lineDashOffset).toBe(cast);
      } else {
        expect(ctx.lineDashOffset).toBe(0);
      }
    });
  });

  it('should save and restore lineDashOffset values when calling save() and restore()', () => {
    ctx.save();
    ctx.lineDashOffset = 30;
    expect(ctx.lineDashOffset).toBe(30);
    ctx.restore();
    expect(ctx.lineDashOffset).toBe(0);
  });
});
