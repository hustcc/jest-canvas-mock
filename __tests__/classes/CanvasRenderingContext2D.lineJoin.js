let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('lineJoin', () => {
  it("should set the default value lineJoin to 'miter'", () => {
    expect(ctx.lineJoin).toBe('miter');
  });

  it("should set the lineJoin if it's a valid lineJoin", () => {
    ctx.lineJoin = 'wrong!';
    expect(ctx.lineJoin).toBe('miter');
  });

  it("should set the lineJoin if it's a valid lineJoin", () => {
    ctx.lineJoin = 'round';
    expect(ctx.lineJoin).toBe('round');
    ctx.lineJoin = 'bevel';
    expect(ctx.lineJoin).toBe('bevel');
    ctx.lineJoin = 'miter';
    expect(ctx.lineJoin).toBe('miter');
  });

  it('should save and restore lineJoin values', () => {
    ctx.lineJoin = 'round';
    ctx.save();
    ctx.lineJoin = 'bevel';
    expect(ctx.lineJoin).toBe('bevel');
    ctx.restore();
    expect(ctx.lineJoin).toBe('round');
  });
});
