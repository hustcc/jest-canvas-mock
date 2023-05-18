let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('arc', () => {
  it('should be a function', () => {
    expect(typeof ctx.arc === 'function').toBeTruthy();
  });

  it('should be callable', () => {
    ctx.arc(1, 2, 3, 4, 5);
    expect(ctx.arc).toBeCalled();
  });

  it("shouldn't accept parameters less than 5", () => {
    expect(() => ctx.arc()).toThrow(TypeError);
    expect(() => ctx.arc(1)).toThrow(TypeError);
    expect(() => ctx.arc(1, 2)).toThrow(TypeError);
    expect(() => ctx.arc(1, 2, 3)).toThrow(TypeError);
    expect(() => ctx.arc(1, 2, 3, 4)).toThrow(TypeError);
  });

  it('should throw when radius is negative', () => {
    const fn = () => ctx.arc(1, 2, -1, 4, 5);
    expect(fn).toThrow(DOMException);
    expect(fn).toThrow('The radius provided (-1) is negative.');
  });

  it('should not throw if any value is `NaN`', () => {
    [
      [NaN, 2, 3, 4, 5],
      [1, NaN, 3, 4, 5],
      [1, 2, NaN, 4, 5],
      [1, 2, 3, NaN, 5],
      [1, 2, 3, 4, NaN],
    ].forEach((e) => {
      expect(() => ctx.arc(...e)).not.toThrow();
    });
  });
});
