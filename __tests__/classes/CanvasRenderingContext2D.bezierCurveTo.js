let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('bezierCurveTo', () => {
  it('should be a function', () => {
    expect(typeof ctx.bezierCurveTo).toBe('function');
  });

  it('should be callable', () => {
    ctx.bezierCurveTo(1, 2, 3, 4, 5, 6);
    expect(ctx.bezierCurveTo).toBeCalled();
  });

  it('should throw if less than 6 parameters are given', () => {
    expect(() => ctx.bezierCurveTo()).toThrow(TypeError);
    expect(() => ctx.bezierCurveTo(1)).toThrow(TypeError);
    expect(() => ctx.bezierCurveTo(1, 2)).toThrow(TypeError);
    expect(() => ctx.bezierCurveTo(1, 2, 3)).toThrow(TypeError);
    expect(() => ctx.bezierCurveTo(1, 2, 3, 4)).toThrow(TypeError);
    expect(() => ctx.bezierCurveTo(1, 2, 3, 4, 5)).toThrow(TypeError);
  });
});
