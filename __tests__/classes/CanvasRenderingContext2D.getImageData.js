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
    ctx.getImageData();
    expect(ctx.getImageData).toBeCalled();
  });

  it('should return a image data from getImageData', () => {
    expect(ctx.getImageData()).toBeInstanceOf(ImageData);
  });

  it('should return a image data from getImageData of proper size', () => {
    const data = ctx.getImageData();
    expect(data.width).toBe(400);
    expect(data.height).toBe(300);
    expect(data.data.length).toBe(400 * 300 * 4);
  });
});
