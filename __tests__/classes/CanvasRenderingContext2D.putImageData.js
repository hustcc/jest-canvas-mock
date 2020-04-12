let canvas;
let ctx;

const data = new ImageData(400, 300);

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('putImageData', () => {
  it('should be a function', () => {
    expect(typeof ctx.putImageData).toBe('function');
  });

  it('should be callable', () => {
    ctx.putImageData(data, 0, 0);
    expect(ctx.putImageData).toBeCalled();
  });

  it('should throw when arguments length is less than 3', () => {
    expect(() => ctx.putImageData()).toThrow(TypeError);
    expect(() => ctx.putImageData(data)).toThrow(TypeError);
    expect(() => ctx.putImageData(data, 1)).toThrow(TypeError);
  });

  it('should throw when arguments length > 3 and less than 7', () => {
    expect(() => ctx.putImageData(data, 1, 2, 3)).toThrow(TypeError);
    expect(() => ctx.putImageData(data, 1, 2, 3, 4)).toThrow(TypeError);
    expect(() => ctx.putImageData(data, 1, 2, 3, 4, 5)).toThrow(TypeError);
  });

  it('should throw when first argument is not of type ImageData', () => {
    expect(() => ctx.putImageData(null, 1, 2)).toThrow(TypeError);
  });
});
