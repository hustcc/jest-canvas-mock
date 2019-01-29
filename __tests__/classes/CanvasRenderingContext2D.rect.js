let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('rect', () => {
  it('should be a function', () => {
    expect(typeof ctx.rect).toBe('function');
  });

  it('should be callable', () => {
    ctx.rect(1, 2, 3, 4);
    expect(ctx.rect).toBeCalled();
  });

  it('should throw if less than 4 parameters are given', () => {
    expect(() => ctx.rect()).toThrow(TypeError);
    expect(() => ctx.rect(1)).toThrow(TypeError);
    expect(() => ctx.rect(1, 2)).toThrow(TypeError);
    expect(() => ctx.rect(1, 2, 3)).toThrow(TypeError);
  });
});
