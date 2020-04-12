let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('createLinearGradient', () => {
  it('should be a function', () => {
    expect(typeof ctx.createLinearGradient).toBe('function');
  });

  it('should be callable', () => {
    ctx.createLinearGradient(1, 2, 3, 4, 5, 6);
    expect(ctx.createLinearGradient).toBeCalled();
  });

  it('should not create a linear gradient when the argument length is < 4', () => {
    expect(() => ctx.createLinearGradient()).toThrow(TypeError);
    expect(() => ctx.createLinearGradient(0)).toThrow(TypeError);
    expect(() => ctx.createLinearGradient(0, 1)).toThrow(TypeError);
    expect(() => ctx.createLinearGradient(0, 1, 2)).toThrow(TypeError);
  });

  it('should not create a linear gradient when any argument is not finite', () => {
    expect(() => ctx.createLinearGradient(Infinity, 1, 2, 3)).toThrow(
      TypeError
    );
    expect(() => ctx.createLinearGradient(0, Infinity, 2, 3)).toThrow(
      TypeError
    );
    expect(() => ctx.createLinearGradient(0, 1, Infinity, 3)).toThrow(
      TypeError
    );
    expect(() => ctx.createLinearGradient(0, 1, 2, Infinity)).toThrow(
      TypeError
    );
  });

  it('should create a linear gradient with string values', () => {
    const grd = ctx.createLinearGradient('1', '2', '3', '4');
    expect(grd).toBeInstanceOf(CanvasGradient);
  });
});
