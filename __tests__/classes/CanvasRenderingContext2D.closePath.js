let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('closePath', () => {
  it('should be a function', () => {
    expect(typeof ctx.closePath).toBe('function');
  });

  it('should be callable', () => {
    ctx.closePath();
    expect(ctx.closePath).toBeCalled();
  });
});
