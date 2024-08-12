let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('reset', () => {
  it('should be a function', () => {
    expect(typeof ctx.reset).toBe('function');
  });

  it('should be callable', () => {
    ctx.reset();
    expect(ctx.reset).toHaveBeenCalled();
  });

  it('should throw if any parameters are given', () => {
    expect(() => ctx.reset(1)).toThrow(TypeError);
  });
});
