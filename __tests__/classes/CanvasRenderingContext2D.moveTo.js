let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('moveTo', () => {
  it('should be a function', () => {
    expect(typeof ctx.moveTo).toBe('function');
  });

  it('should be callable', () => {
    ctx.moveTo(1, 2, 3, 4);
    expect(ctx.moveTo).toBeCalled();
  });

  it('should throw if less than 2 parameters are given', () => {
    expect(() => ctx.moveTo()).toThrow(TypeError);
    expect(() => ctx.moveTo(1)).toThrow(TypeError);
  });
});
