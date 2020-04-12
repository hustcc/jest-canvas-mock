let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
  ctx.setTransform(1, 2, 3, 4, 5, 6);
});

describe('rotate', () => {
  it('should be a function', () => {
    expect(typeof ctx.rotate).toBe('function');
  });

  it('should be callable', () => {
    ctx.rotate(1);
    expect(ctx.rotate).toBeCalled();
  });

  it('should rotate the current transform', () => {
    ctx.rotate(Math.PI);
    expect(ctx.currentTransform).toEqual(
      new DOMMatrix([-0.9999999999999997, -1.9999999999999996, -3, -4, 5, 6])
    );
  });

  it('should throw if argument count is less than 2', () => {
    expect(() => ctx.rotate()).toThrow(TypeError);
  });

  it("shouldn't rotate the transform if any of the values cannot be coerced into finite numbers", () => {
    ctx.rotate(NaN);
    expect(ctx.currentTransform).toEqual(new DOMMatrix([1, 2, 3, 4, 5, 6]));
  });
});
