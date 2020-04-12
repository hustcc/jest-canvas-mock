let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('fillStyle', () => {
  it("should parse a css color string 'blue'", () => {
    ctx.fillStyle = 'blue';
    expect(ctx.fillStyle).toBe('#0000ff');
  });

  it('should not parse invalid colors', () => {
    ctx.fillStyle = 'invalid!';
    expect(ctx.fillStyle).toBe('#000000');
  });

  it('should parse css colors with alpha values', () => {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    expect(ctx.fillStyle).toBe('rgba(255, 255, 255, 0.4)');
  });

  it('should save and restore fillStyle values', () => {
    ctx.fillStyle = 'green';
    ctx.save();
    ctx.fillStyle = 'red';
    expect(ctx.fillStyle).toBe('#ff0000');
    ctx.restore();
    expect(ctx.fillStyle).toBe('#008000');
  });

  it('should accept CanvasPatterns as valid fillStyle values', () => {
    const image = new Image();
    image.src = 'test.png';
    const pattern = ctx.createPattern(image, 'no-repeat');
    ctx.fillStyle = pattern;
    expect(ctx.fillStyle).toBe(pattern);
  });

  it('should accept CanvasGradients as valid fillStyle values', () => {
    const grd = ctx.createRadialGradient(1, 2, 3, 4, 5, 6);
    ctx.fillStyle = grd;
    expect(ctx.fillStyle).toBe(grd);
  });

  it('should ignore invalid fillStyle values', () => {
    ctx.fillStyle = null;
    expect(ctx.fillStyle).toBe('#000000');
  });
});
