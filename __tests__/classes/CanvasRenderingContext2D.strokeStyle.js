let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('strokeStyle', () => {
  it("should parse a css color string 'blue'", () => {
    ctx.strokeStyle = 'blue';
    expect(ctx.strokeStyle).toBe('#0000ff');
  });

  it('should not parse invalid colors', () => {
    ctx.strokeStyle = 'invalid!';
    expect(ctx.strokeStyle).toBe('#000000');
  });

  it('should parse css colors with alpha values', () => {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    expect(ctx.strokeStyle).toBe('rgba(255, 255, 255, 0.4)');
  });

  it('should save and restore strokeStyle values', () => {
    ctx.strokeStyle = 'green';
    ctx.save();
    ctx.strokeStyle = 'red';
    expect(ctx.strokeStyle).toBe('#ff0000');
    ctx.restore();
    expect(ctx.strokeStyle).toBe('#008000');
  });

  it('should accept CanvasPatterns as valid strokeStyle values', () => {
    const image = new Image();
    image.src = 'test.png';
    const pattern = ctx.createPattern(image, 'no-repeat');
    ctx.strokeStyle = pattern;
    expect(ctx.strokeStyle).toBe(pattern);
  });

  it('should accept CanvasGradients as valid strokeStyle values', () => {
    const grd = ctx.createRadialGradient(1, 2, 3, 4, 5, 6);
    ctx.strokeStyle = grd;
    expect(ctx.strokeStyle).toBe(grd);
  });

  it('should ignore invalid strokeStyle values', () => {
    ctx.strokeStyle = null;
    expect(ctx.strokeStyle).toBe('#000000');
  });
});
