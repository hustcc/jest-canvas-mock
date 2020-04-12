let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('textAlign', () => {
  it("should set the default value to 'start'", () => {
    expect(ctx.textAlign).toBe('start');
  });

  it("should not set the value if it's not a valid textAlign", () => {
    ctx.textAlign = 'wrong!';
    expect(ctx.textAlign).toBe('start');
  });

  it("should set the textAlign if it's a valid textAlign", () => {
    ['left', 'right', 'center', 'start', 'end'].forEach((e) => {
      ctx.textAlign = e;
      expect(ctx.textAlign).toBe(e);
    });
  });

  it('should save and restore textAlign values', () => {
    ctx.textAlign = 'right';
    ctx.save();
    ctx.textAlign = 'center';
    expect(ctx.textAlign).toBe('center');
    ctx.restore();
    expect(ctx.textAlign).toBe('right');
  });
});
