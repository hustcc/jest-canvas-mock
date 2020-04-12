let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('measureText', () => {
  it('should be a function', () => {
    expect(typeof ctx.measureText).toBe('function');
  });

  it('should be callable', () => {
    ctx.measureText(1);
    expect(ctx.measureText).toBeCalled();
  });

  it('should return a TextMetrics object', () => {
    const m = ctx.measureText('Hello There!');
    expect(m).toBeInstanceOf(TextMetrics);
  });

  it('should return a text metrics object of expected width', () => {
    const me = ctx.measureText('Test!');
    expect(me.width).toBe(5);
  });

  it('should return a text metrics object for different kinds of input', () => {
    [NaN, 1, null, void 0, 'bleh'].forEach((val) => {
      expect(() => ctx.measureText(val)).not.toThrow();
    });
  });

  it('should throw if an argument is not provided', () => {
    expect(() => ctx.measureText()).toThrow();
  });
});
