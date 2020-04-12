let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('globalCompositeOperation', () => {
  it("should change the global composite operation when it's valid", () => {
    const validOperations = [
      'source-over',
      'source-in',
      'source-out',
      'source-atop',
      'destination-over',
      'destination-in',
      'destination-out',
      'destination-atop',
      'lighter',
      'copy',
      'xor',
      'multiply',
      'screen',
      'overlay',
      'darken',
      'lighten',
      'color-dodge',
      'color-burn',
      'hard-light',
      'soft-light',
      'difference',
      'exclusion',
      'hue',
      'saturation',
      'color',
      'luminosity',
    ];
    validOperations.forEach((e) => {
      ctx.globalCompositeOperation = e;
      expect(ctx.globalCompositeOperation).toBe(e);
    });
  });

  it('should ignore non valid values', () => {
    [null, -1, void 0, Infinity, NaN, 'blah', ''].forEach((e) => {
      ctx.globalCompositeOperation = e;
      expect(ctx.globalCompositeOperation).toBe('source-over');
    });
  });

  it('should save and restore composite values', () => {
    ctx.save();
    ctx.globalCompositeOperation = 'source-in';
    expect(ctx.globalCompositeOperation).toBe('source-in');
    ctx.restore();
    expect(ctx.globalCompositeOperation).toBe('source-over');
  });
});
