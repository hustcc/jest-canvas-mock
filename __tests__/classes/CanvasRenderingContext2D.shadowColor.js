let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('shadowColor', () => {
  it("should parse a css color string 'blue'", () => {
    ctx.shadowColor = 'blue';
    expect(ctx.shadowColor).toBe('#0000ff');
  });

  it('should not parse invalid colors', () => {
    ctx.shadowColor = 'invalid!';
    expect(ctx.shadowColor).toBe('rgba(0, 0, 0, 0)');
  });

  it('should parse css colors with alpha values', () => {
    ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
    expect(ctx.shadowColor).toBe('rgba(255, 255, 255, 0.4)');
  });

  it('should save and restore shadowColor values', () => {
    ctx.shadowColor = 'green';
    ctx.save();
    ctx.shadowColor = 'red';
    expect(ctx.shadowColor).toBe('#ff0000');
    ctx.restore();
    expect(ctx.shadowColor).toBe('#008000');
  });

  it('should ignore invalid shadowColor values', () => {
    ctx.shadowColor = null;
    expect(ctx.shadowColor).toBe('rgba(0, 0, 0, 0)');
  });
});
