let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('removeHitRegion', () => {
  it('should be a function', () => {
    expect(typeof ctx.removeHitRegion).toBe('function');
  });

  it('should be callable', () => {
    ctx.removeHitRegion('test');
    expect(ctx.removeHitRegion).toBeCalled();
  });

  it('should throw if less than 1 parameter is given', () => {
    expect(() => ctx.removeHitRegion()).toThrow(TypeError);
  });
});
