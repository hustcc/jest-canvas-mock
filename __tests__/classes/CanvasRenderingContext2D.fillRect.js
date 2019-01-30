let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('fillRect', () => {
  it('should be a function', () => {
    expect(typeof ctx.fillRect).toBe('function');
  });

  it('should be callable', () => {
    ctx.fillRect(1, 2, 3, 4);
    expect(ctx.fillRect).toBeCalled();
  });

  it('should throw if less than 4 parameters are given', () => {
    expect(() => ctx.fillRect()).toThrow(TypeError);
    expect(() => ctx.fillRect(1)).toThrow(TypeError);
    expect(() => ctx.fillRect(1, 2)).toThrow(TypeError);
    expect(() => ctx.fillRect(1, 2, 3)).toThrow(TypeError);
  });
});
