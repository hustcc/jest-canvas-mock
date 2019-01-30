let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('lineTo', () => {
  it('should be a function', () => {
    expect(typeof ctx.lineTo).toBe('function');
  });

  it('should be callable', () => {
    ctx.lineTo(1, 2, 3, 4);
    expect(ctx.lineTo).toBeCalled();
  });

  it('should throw if less than 2 parameters are given', () => {
    expect(() => ctx.lineTo()).toThrow(TypeError);
    expect(() => ctx.lineTo(1)).toThrow(TypeError);
  });
});
