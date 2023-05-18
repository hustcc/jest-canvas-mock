let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('getImageData', () => {
  it('should be a function', () => {
    expect(typeof ctx.getImageData).toBe('function');
  });

  it('should be callable', () => {
    ctx.getImageData(0, 0, 10, 20);
    expect(ctx.getImageData).toBeCalled();
  });

  it('should throw if less than 4 parameters are given', () => {
    expect(() => ctx.getImageData()).toThrow(TypeError);
    expect(() => ctx.getImageData(0)).toThrow(TypeError);
    expect(() => ctx.getImageData(0, 0)).toThrow(TypeError);
    expect(() => ctx.getImageData(0, 0, 0)).toThrow(TypeError);
  });

  it('should return a image data from getImageData', () => {
    expect(ctx.getImageData(0, 0, 10, 20)).toBeInstanceOf(ImageData);
  });

  it('should return a image data from getImageData of proper size', () => {
    const data = ctx.getImageData(0, 0, 10, 20);
    expect(data.width).toBe(10);
    expect(data.height).toBe(20);
    expect(data.data.length).toBe(10 * 20 * 4);
  });

  it('should return image data from getImageData if size is negative', () => {
    const data = ctx.getImageData(0, 0, -10, -20);
    expect(data.width).toBe(10);
    expect(data.height).toBe(20);
    expect(data.data.length).toBe(10 * 20 * 4);
  });

  it('should throw if width or height are zero', () => {
    expect(() => ctx.getImageData(0, 0, 0, 1)).toThrow(DOMException);
    expect(() => ctx.getImageData(0, 0, 0, 1)).toThrow('source width is 0');
    expect(() => ctx.getImageData(0, 0, 1, 0)).toThrow('source height is 0');
    expect(() => ctx.getImageData(0, 0, 0, 0)).toThrow('source width is 0');
  });
});
