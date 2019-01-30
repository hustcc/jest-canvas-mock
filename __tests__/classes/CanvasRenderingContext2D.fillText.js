let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('fillText', () => {
  it('should be a function', () => {
    expect(typeof ctx.fillText).toBe('function');
  });

  it('should be callable', () => {
    ctx.fillText('hello world!', 1, 2);
    expect(ctx.fillText).toBeCalled();
  });

  it('should throw if argument length < 3', () => {
    expect(() => ctx.fillText()).toThrow();
    expect(() => ctx.fillText(1)).toThrow();
    expect(() => ctx.fillText(1, 2)).toThrow();
  });
});
