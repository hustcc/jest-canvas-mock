let ctx;
let canvas;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
});

describe('createImageData', () => {
  it('should be a function', () => {
    expect(typeof ctx.createImageData).toBe('function');
  });

  it('should be callable', () => {
    ctx.createImageData(1, 2);
    expect(ctx.createImageData).toBeCalled();
  });

  it('should return an ImageData', () => {
    const result = ctx.createImageData(1, 2);
    expect(result).toBeInstanceOf(ImageData);
  });

  it('should throw if arguments length is 0', () => {
    expect(() => ctx.createImageData()).toThrow(TypeError);
  });

  it('should throw if arguments.length === 1 and first parameter is not image data', () => {
    expect(() => ctx.createImageData(1)).toThrow(TypeError);
  });

  it('should return a new ImageData if first parameter is ImageData', () => {
    const input = new ImageData(100, 100);
    const result = ctx.createImageData(input);
    expect(input).not.toBe(result);
    expect(result).toBeInstanceOf(ImageData);
  });

  it('should throw if two parameters are provided and any of them are not finite or 0', () => {
    [
      [0, 0],
      [NaN, 1],
      [1, NaN],
      ['test', null],
    ].forEach((value) => {
      expect(() => ctx.createImageData(...value)).toThrow(TypeError);
    });
  });
});
