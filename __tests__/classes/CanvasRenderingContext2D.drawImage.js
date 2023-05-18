let canvas;
let ctx;
const img = new Image();
img.src = 'https://placekitten.com/400/300';
beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('drawImage', () => {
  it('should be a function', () => {
    expect(typeof ctx.drawImage).toBe('function');
  });

  it('should be callable', () => {
    ctx.drawImage(img, 1, 2);
    expect(ctx.drawImage).toBeCalled();
  });

  it('should draw when image is Video', () => {
    const video = document.createElement('video');
    expect(() => ctx.drawImage(video, 1, 2)).not.toThrow();
  });

  it('should draw when image is Canvas', () => {
    const canvas = document.createElement('canvas');
    expect(() => ctx.drawImage(canvas, 1, 2)).not.toThrow();
  });

  it('should draw when image is ImageBitmap', () => {
    expect(() => ctx.drawImage(new ImageBitmap(100, 100), 1, 2)).not.toThrow();
  });

  it('should not draw if the image bitmap is closed', () => {
    const bmp = new ImageBitmap(100, 100);
    bmp.close();
    const fn = () => ctx.drawImage(bmp, 1, 2);
    expect(fn).toThrow(DOMException);
    expect(fn).toThrow('The image source is detached.');
  });

  it('should accept 3, 5, and 9 parameters', () => {
    expect(() => ctx.drawImage(img, 1, 2)).not.toThrow();
    expect(() => ctx.drawImage(img, 1, 2, 3, 4)).not.toThrow();
    expect(() => ctx.drawImage(img, 1, 2, 3, 4, 5, 6, 7, 8)).not.toThrow();
  });

  it('should not accept, 1, 2, 4, 6, 7, 8 parameters', () => {
    [
      [img],
      [img, 1],
      [img, 1, 2, 3],
      [img, 1, 2, 3, 4, 5],
      [img, 1, 2, 3, 4, 5, 6],
      [img, 1, 2, 3, 4, 5, 6, 7],
    ].forEach((e) => {
      expect(() => ctx.drawImage(...e)).toThrow(TypeError);
    });
  });

  it('should not accept nulls or invalid image types', () => {
    [null, 1, NaN, Infinity, 'testing'].forEach((e) => {
      expect(() => ctx.drawImage(e, 1, 2)).toThrow(TypeError);
    });
  });
});
