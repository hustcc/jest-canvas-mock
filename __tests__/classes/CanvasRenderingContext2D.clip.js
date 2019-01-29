let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('clip', () => {
  it('should be a function', () => {
    expect(typeof ctx.clip).toBe('function');
  });

  it('should be callable', () => {
    ctx.clip();
    expect(ctx.clip).toBeCalled();
  });
});
