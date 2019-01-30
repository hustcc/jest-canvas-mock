let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('strokeText', () => {
  it('should be a function', () => {
    expect(typeof ctx.strokeText).toBe('function');
  });

  it('should be callable', () => {
    ctx.strokeText('hello world!', 1, 2);
    expect(ctx.strokeText).toBeCalled();
  });

  it('should throw if argument length < 3', () => {
    expect(() => ctx.strokeText()).toThrow();
    expect(() => ctx.strokeText(1)).toThrow();
    expect(() => ctx.strokeText(1, 2)).toThrow();
  });
});
