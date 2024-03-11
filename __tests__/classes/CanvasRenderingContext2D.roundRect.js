let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('roundRect', () => {
  it('should be a function', () => {
    expect(typeof ctx.roundRect).toBe('function');
  });

  it('should be callable', () => {
    ctx.roundRect(1, 2, 3, 4, [5, 6, 7, 8]);
    expect(ctx.roundRect).toBeCalled();
  });

  it('should throw if less than 4 parameters are given', () => {
    expect(() => ctx.roundRect()).toThrow(TypeError);
    expect(() => ctx.roundRect(1)).toThrow(TypeError);
    expect(() => ctx.roundRect(1, 2)).toThrow(TypeError);
    expect(() => ctx.roundRect(1, 2, 3)).toThrow(TypeError);
  });

  describe('radii parameter', () => {
    it('should throw if is an empty array', () => {
      expect(() => ctx.roundRect(1, 2, 3, 4, [])).toThrow(TypeError);
    });

    it('should throw if has more than 4 elements', () => {
      expect(() => ctx.roundRect(1, 2, 3, 4, [1, 2, 3, 4, 5])).toThrow(
        TypeError
      );
    });
  });
});
