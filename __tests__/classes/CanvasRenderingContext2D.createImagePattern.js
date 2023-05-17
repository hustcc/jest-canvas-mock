let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('createImagePattern', () => {
  it('should createImagePatterns', () => {
    const img = new Image();
    img.src = 'http://some-domain.com/my-image.png';
    const result = ctx.createPattern(img, 'no-repeat');
    expect(result).toBeInstanceOf(CanvasPattern);
  });

  it("shouldn't create image patterns when argument length is 1", () => {
    const img = new Image();
    img.src = 'http://some-domain.com/my-image.png';
    expect(() => ctx.createPattern(img)).toThrow(TypeError);
  });

  it("shouldn't create image patterns when second argument is undefined", () => {
    const img = new Image();
    img.src = 'http://some-domain.com/my-image.png';
    expect(() => ctx.createPattern(img, void 0)).toThrow(TypeError);
  });

  it('should create image patterns when second argument is null', () => {
    const img = new Image();
    img.src = 'http://some-domain.com/my-image.png';
    expect(ctx.createPattern(img, null)).toBeInstanceOf(CanvasPattern);
  });

  it('should create image patterns when second argument is empty string', () => {
    const img = new Image();
    img.src = 'http://some-domain.com/my-image.png';
    expect(ctx.createPattern(img, '')).toBeInstanceOf(CanvasPattern);
  });

  it("shouldn't create imagePattern when image is not valid", () => {
    expect(() => ctx.createPattern(null, 'repeat')).toThrow();
  });

  it('should create a pattern when image is Video', () => {
    const video = document.createElement('video');
    expect(ctx.createPattern(video, 'repeat')).toBeInstanceOf(CanvasPattern);
  });

  it('should create a pattern when image is Canvas', () => {
    const canvas = document.createElement('canvas');
    expect(ctx.createPattern(canvas, 'repeat')).toBeInstanceOf(CanvasPattern);
  });

  it('should create a pattern when image is ImageBitmap', () => {
    expect(
      ctx.createPattern(new ImageBitmap(400, 300), 'repeat')
    ).toBeInstanceOf(CanvasPattern);
  });

  it('should not create a pattern if the image bitmap is closed', () => {
    const bmp = new ImageBitmap(400, 300);
    bmp.close();
    const fn = () => ctx.createPattern(bmp, 'repeat');
    expect(fn).toThrow(DOMException);
    expect(fn).toThrow('The image source is detached.');
  });

  it('should create a valid pattern for all repeat types', () => {
    const image = new Image();
    image.src = 'test/myImage.jpg';

    ['repeat', 'repeat-x', 'repeat-y', 'no-repeat'].forEach((e) => {
      expect(ctx.createPattern(image, e)).toBeInstanceOf(CanvasPattern);
    });
  });
});
