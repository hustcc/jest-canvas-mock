let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('addHitRegion', () => {
  it('should be a function', () => {
    expect(ctx.addHitRegion).toBeTruthy();
  });

  it('should be callable', () => {
    ctx.addHitRegion({ id: 'test' });
    expect(ctx.addHitRegion).toBeCalled();
  });

  it('should throw if called with no parameters', () => {
    const fn = () => ctx.addHitRegion();
    expect(fn).toThrow(DOMException);
    expect(fn).toThrow('Both id and control are null');
  });

  it("should throw if fillRule is set and isn't 'evenodd' or 'nonzero'", () => {
    const fn = () => ctx.addHitRegion({ id: 'test', fillRule: 'wrong!' });
    expect(fn).toThrow(TypeError);
    expect(fn).toThrow('is not a valid enum value of type CanvasFillRule');
  });

  it('should not throw if fillRule is valid', () => {
    expect(() =>
      ctx.addHitRegion({ id: 'test', fillRule: 'evenodd' })
    ).not.toThrow();
    expect(() =>
      ctx.addHitRegion({ id: 'test', fillRule: 'nonzero' })
    ).not.toThrow();
  });
});
