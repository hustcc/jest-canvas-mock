let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('filter', () => {
  it("should have a filter property default value 'none'", () => {
    expect(ctx.filter).toBe('none');
  });

  it('should set the filter property', () => {
    ctx.filter = 'sepia(100%)';
    expect(ctx.filter).toBe('sepia(100%)');
  });

  it('should ignore non-string values', () => {
    ctx.filter = 2;
    expect(ctx.filter).toBe('none');
  });

  it('should set empty string to none', () => {
    ctx.filter = '';
    expect(ctx.filter).toBe('none');
  });

  it('should save and restore filter values', () => {
    ctx.save();
    ctx.filter = 'sepia(100%)';
    ctx.restore();
    expect(ctx.filter).toBe('none');
  });
});
