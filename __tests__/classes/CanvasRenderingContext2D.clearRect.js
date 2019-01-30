let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('clearRect', () => {
  it('should be a function', () => {
    expect(typeof ctx.clearRect).toBe('function');
  });

  it('should be callable', () => {
    ctx.clearRect(1, 2, 3, 4);
    expect(ctx.clearRect).toBeCalled();
  });

  it('should throw if less than 4 parameters are given', () => {
    expect(() => ctx.clearRect()).toThrow(TypeError);
    expect(() => ctx.clearRect(1)).toThrow(TypeError);
    expect(() => ctx.clearRect(1, 2)).toThrow(TypeError);
    expect(() => ctx.clearRect(1, 2, 3)).toThrow(TypeError);
  });
});
