let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('CanvasRenderingContext2D prototype', () => {
  it('should be instanceof CanvasRenderingContext2D', () => {
    expect(ctx).toBeInstanceOf(CanvasRenderingContext2D);
  });

  it('should have a canvas property', () => {
    expect(ctx.canvas).toBe(canvas);
  });

  it('should have a getContext function', () => {
    expect(canvas.getContext).toBeCalled();
  });

  it('should be defined on the prototype', () => {
    expect(HTMLCanvasElement.prototype.getContext).toBeCalled();
  });
});
