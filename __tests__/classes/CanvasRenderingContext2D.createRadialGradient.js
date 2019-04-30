let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('createRadialGradient', () => {
  it('should be a function', () => {
    expect(typeof ctx.createRadialGradient).toBe('function');
  });

  it('should be callable', () => {
    ctx.createRadialGradient(1, 2, 3, 4, 5, 6);
    expect(ctx.createRadialGradient).toBeCalled();
  });

  it('should not create a radial gradient when the argument length is < 6', () => {
    expect(() => ctx.createRadialGradient(0, 1, 2, 3, 4)).toThrow(TypeError);
  });

  it('should not create a radial gradient when any argument is not finite', () => {
    expect(() => ctx.createRadialGradient(Infinity, 1, 2, 3, 4, 5)).toThrow(TypeError);
    expect(() => ctx.createRadialGradient(0, Infinity, 2, 3, 4, 5)).toThrow(TypeError);
    expect(() => ctx.createRadialGradient(0, 1, Infinity, 3, 4, 5)).toThrow(TypeError);
    expect(() => ctx.createRadialGradient(0, 1, 2, Infinity, 4, 5)).toThrow(TypeError);
    expect(() => ctx.createRadialGradient(0, 1, 2, 3, Infinity, 5)).toThrow(TypeError);
    expect(() => ctx.createRadialGradient(0, 1, 2, 3, 4, Infinity)).toThrow(TypeError);
  });

  it('should not create a radial gradient if any of the radius values are < 0', () => {
    expect(() => ctx.createRadialGradient(0, 0, -1, 0, 0, 0)).toThrow(DOMException);
    expect(() => ctx.createRadialGradient(0, 0, 0, 0, 0, -1)).toThrow(DOMException);
  });

  it('should create a radial gradient with string values', () => {
    const result = ctx.createRadialGradient('1', '2', '3', '4', '5', '6');
    expect(result).toBeInstanceOf(CanvasGradient);
  });
});
