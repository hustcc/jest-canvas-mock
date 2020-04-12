let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('imageSmoothingQuality', () => {
  it('should accept valid imageSmoothingQuality values', () => {
    ['high', 'medium', 'low'].forEach((e) => {
      ctx.imageSmoothingQuality = e;
      expect(ctx.imageSmoothingQuality).toBe(e);
    });
  });

  it('should ignore invalid imageSmoothingQuality values', () => {
    [true, false, 1, 0, null, '', Infinity, void 0, NaN, 'invalid!'].forEach(
      (e) => {
        ctx.imageSmoothingQuality = e;
        expect(ctx.imageSmoothingQuality).toBe('low');
      }
    );
  });

  it('should save and restore imageSmoothingQuality values', () => {
    ctx.save();
    ctx.imageSmoothingQuality = 'high';
    ctx.restore();
    expect(ctx.imageSmoothingQuality).toBe('low');
  });
});
