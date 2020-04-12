let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('direction', () => {
  it("should set the default value direction to 'inherit'", () => {
    expect(ctx.direction).toBe('inherit');
  });

  it("should set the direction if it's a valid direction", () => {
    ctx.direction = 'wrong!';
    expect(ctx.direction).toBe('inherit');
  });

  it("should set the direction if it's a valid direction", () => {
    ctx.direction = 'ltr';
    expect(ctx.direction).toBe('ltr');
    ctx.direction = 'rtl';
    expect(ctx.direction).toBe('rtl');
    ctx.direction = 'inherit';
    expect(ctx.direction).toBe('inherit');
  });

  it('should save and restore direction values', () => {
    ctx.direction = 'ltr';
    ctx.save();
    ctx.direction = 'rtl';
    expect(ctx.direction).toBe('rtl');
    ctx.restore();
    expect(ctx.direction).toBe('ltr');
  });
});
