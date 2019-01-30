let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('beginPath', () => {
  it('should be a function', () => {
    expect(typeof ctx.beginPath).toBe('function');
  });

  it('should be callable', () => {
    ctx.beginPath();
    expect(ctx.beginPath).toBeCalled();
  });
});
