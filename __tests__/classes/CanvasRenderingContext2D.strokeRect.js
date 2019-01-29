let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('strokeRect', () => {
  it('should be a function', () => {
    expect(typeof ctx.strokeRect).toBe('function');
  });

  it('should be callable', () => {
    ctx.strokeRect(1, 2, 3, 4);
    expect(ctx.strokeRect).toBeCalled();
  });

  it('should throw if less than 4 parameters are given', () => {
    expect(() => ctx.strokeRect()).toThrow(TypeError);
    expect(() => ctx.strokeRect(1)).toThrow(TypeError);
    expect(() => ctx.strokeRect(1, 2)).toThrow(TypeError);
    expect(() => ctx.strokeRect(1, 2, 3)).toThrow(TypeError);
  });
});
