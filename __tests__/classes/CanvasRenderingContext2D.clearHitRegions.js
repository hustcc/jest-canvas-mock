let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('clearHitRegions', () => {
  it('should be a function', () => {
    expect(typeof ctx.clearHitRegions).toBe('function');
  });

  it('should be callable', () => {
    ctx.clearHitRegions();
    expect(ctx.clearHitRegions).toBeCalled();
  });
});
