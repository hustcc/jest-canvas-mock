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
    expect(() => ctx.addHitRegion()).toThrow(DOMException);
  });

  it('should throw if fillRule is set and isn\'t \'evenodd\' or \'nonzero\'', () => {
    expect(() => ctx.addHitRegion({ id: 'test', fillRule: 'wrong!' })).toThrow();
  });

  it('should not throw if fillRule is valid', () => {
    expect(() => ctx.addHitRegion({ id: 'test', fillRule: 'evenodd' })).not.toThrow();
    expect(() => ctx.addHitRegion({ id: 'test', fillRule: 'nonzero' })).not.toThrow();
  });
});
