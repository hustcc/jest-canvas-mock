let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('currentTransform', () => {
  it('should return a DOMMatrix when accessing the currentTransform property', () => {
    expect(ctx.currentTransform).toBeInstanceOf(DOMMatrix);
  });

  it("should ignore setting currentTransform if it's not a valid DOMMatrix", () => {
    ctx.currentTransform = null;
    expect(ctx._transformStack[0][0]).toBe(1);
    expect(ctx._transformStack[0][1]).toBe(0);
    expect(ctx._transformStack[0][2]).toBe(0);
    expect(ctx._transformStack[0][3]).toBe(1);
    expect(ctx._transformStack[0][4]).toBe(0);
    expect(ctx._transformStack[0][5]).toBe(0);
  });

  it('should return a DOMMatrix when calling getTransform()', () => {
    expect(ctx.getTransform()).toBeInstanceOf(DOMMatrix);
  });

  it('should set the current transform of the context when setting the currentTransform property', () => {
    const matrix = new DOMMatrix([1, 2, 3, 4, 5, 6]);
    ctx.currentTransform = matrix;
    expect(ctx._transformStack[0][0]).toBe(1);
    expect(ctx._transformStack[0][1]).toBe(2);
    expect(ctx._transformStack[0][2]).toBe(3);
    expect(ctx._transformStack[0][3]).toBe(4);
    expect(ctx._transformStack[0][4]).toBe(5);
    expect(ctx._transformStack[0][5]).toBe(6);
  });
});
