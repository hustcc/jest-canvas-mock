let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

function every(items, callback) {
  for (let i = 0; i < items.length; i++) {
    if (callback(items[i])) {
      continue;
    }
    return false;
  }
  return true;
}

describe('setTransform', () => {
  it('should be a function', () => {
    expect(typeof ctx.setTransform).toBe('function');
  });

  it('should be callable', () => {
    ctx.setTransform(1, 2, 3, 4, 5, 6);
    expect(ctx.setTransform).toBeCalled();
  });

  it('should validate setTransform input', () => {
    [
      [1, 2, 3, 4, 5, 6],
      [-1, 2, 3, 4, 5, 6],
      [Infinity, null, 'test', 'bad', NaN, 34],
    ].forEach((e) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.setTransform(...e);
      if (every(e, (val) => Number.isFinite(Number(val)))) {
        expect(ctx.getTransform()).toEqual(new DOMMatrix(e));
      } else {
        expect(ctx.getTransform().isIdentity).toBeTruthy();
      }
    });
  });

  it('should accept a 2d matrix as a valid setTransform parameter', () => {
    const m = new DOMMatrix([1, 2, 3, 4, 5, 6]);
    ctx.setTransform(m);
    expect(ctx.getTransform()).toEqual(new DOMMatrix([1, 2, 3, 4, 5, 6]));
  });

  it("should throw when setTransform doesn't receive valid DOMMatrix", () => {
    expect(() => ctx.setTransform({})).toThrow(TypeError);
  });

  it('should accept 0 parameters for the setTransform function (resetTransform)', () => {
    ctx.setTransform(1, 2, 3, 4, 5, 6);
    expect(ctx.getTransform()).toEqual(new DOMMatrix([1, 2, 3, 4, 5, 6]));
    ctx.setTransform();
    expect(ctx.getTransform()).toEqual(new DOMMatrix([1, 0, 0, 1, 0, 0]));
  });

  it('should not throw but return if any value provided to setTransform is not finite', () => {
    const identity = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    [
      [NaN, 2, 3, 4, 5, 6],
      [1, NaN, 3, 4, 5, 6],
      [1, 2, NaN, 4, 5, 6],
      [1, 2, 3, NaN, 5, 6],
      [1, 2, 3, 4, NaN, 6],
      [1, 2, 3, 4, 5, NaN],
    ].forEach((e) => {
      ctx.setTransform(...e);
      expect(ctx.getTransform()).toEqual(identity);
    });
  });

  it('should throw if setTransform receives 3-5 parameters', () => {
    expect(() => ctx.setTransform(1, 2, 3, 4)).toThrow(TypeError);
  });
});
