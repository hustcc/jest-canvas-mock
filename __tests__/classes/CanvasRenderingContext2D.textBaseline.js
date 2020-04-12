let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('textBaseline', () => {
  it("should set the default value to 'alphabetic'", () => {
    expect(ctx.textBaseline).toBe('alphabetic');
  });

  it("shouldn't set the value if it's not a valid textBaseline", () => {
    ctx.textBaseline = 'wrong!';
    expect(ctx.textBaseline).toBe('alphabetic');
  });

  it("should set the textBaseline if it's a valid textBaseline", () => {
    ['top', 'hanging', 'middle', 'alphabetic', 'ideographic', 'bottom'].forEach(
      (e) => {
        ctx.textBaseline = e;
        expect(ctx.textBaseline).toBe(e);
      }
    );
  });

  it('should save and restore textBaseline values', () => {
    ctx.textBaseline = 'top';
    ctx.save();
    ctx.textBaseline = 'hanging';
    expect(ctx.textBaseline).toBe('hanging');
    ctx.restore();
    expect(ctx.textBaseline).toBe('top');
  });
});
