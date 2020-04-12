let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('lineCap', () => {
  it('should accept valid lineCap values', () => {
    ['butt', 'round', 'square'].forEach((e) => {
      ctx.lineCap = e;
      expect(ctx.lineCap).toBe(e);
    });
  });

  it('should ignore invalid lineCap values', () => {
    [true, false, 1, 0, null, '', Infinity, void 0, NaN, 'invalid!'].forEach(
      (e) => {
        ctx.lineCap = e;
        expect(ctx.lineCap).toBe('butt');
      }
    );
  });

  it('should save and restore lineCap values', () => {
    ctx.save();
    ctx.lineCap = 'round';
    ctx.restore();
    expect(ctx.lineCap).toBe('butt');
  });
});
