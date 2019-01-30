let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('quadraticCurveTo', () => {
  it('should be a function', () => {
    expect(typeof ctx.quadraticCurveTo).toBe('function');
  });

  it('should be callable', () => {
    ctx.quadraticCurveTo(1, 2, 3, 4);
    expect(ctx.quadraticCurveTo).toBeCalled();
  });

  it('should throw if less than 4 parameters are given', () => {
    expect(() => ctx.quadraticCurveTo()).toThrow(TypeError);
    expect(() => ctx.quadraticCurveTo(1)).toThrow(TypeError);
    expect(() => ctx.quadraticCurveTo(1, 2)).toThrow(TypeError);
    expect(() => ctx.quadraticCurveTo(1, 2, 3)).toThrow(TypeError);
  });
});
