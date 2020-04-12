let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('imageSmoothingQuality', () => {
  it('should set the imageSmoothingEnabled values to truthy values', () => {
    [true, false, 1, 0, null, '', Infinity, void 0, NaN].forEach((e) => {
      ctx.imageSmoothingEnabled = e;
      expect(ctx.imageSmoothingEnabled).toBe(!!e);
    });
  });

  it('should save and restore to modify the imageSmoothingEnabled values', () => {
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    expect(ctx.imageSmoothingEnabled).toBeFalsy();
    ctx.restore();
    expect(ctx.imageSmoothingEnabled).toBeTruthy();
  });
});
