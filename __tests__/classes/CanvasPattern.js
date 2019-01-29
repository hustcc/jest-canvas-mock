let ctx;
let canvas;
const img = new Image();
img.src = 'https://placekitten.com/400/300';

beforeEach(() => {
  canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 300;
  ctx = canvas.getContext('2d');
});

describe('CanvasPattern', () => {

  test('CanvasPattern', () => {
    const canvasPattern = ctx.createPattern(img, 'no-repeat');
    expect(canvasPattern).toBeDefined();
    expect(canvasPattern).toBeInstanceOf(CanvasPattern);
  });

  it('should have a setTransform function', () => {
    const canvasPattern = ctx.createPattern(img, 'no-repeat');
    expect(typeof canvasPattern.setTransform).toBe('function');
  });

  it('should have callable setTransform', () => {
    const canvasPattern = ctx.createPattern(img, 'no-repeat');
    canvasPattern.setTransform(ctx.getTransform());
    expect(canvasPattern.setTransform).toBeCalled();
  });

  it('should throw if arguments.length > 0 and transform not instanceof Object', () => {
    const canvasPattern = ctx.createPattern(img, 'no-repeat');
    expect(() => canvasPattern.setTransform(1)).toThrow(TypeError);
  });

  test('CanvasPattern different instance', () => {
    const canvasPattern1 = ctx.createPattern(img, 'no-repeat');
    const canvasPattern2 = ctx.createPattern(img, 'no-repeat');
    expect(canvasPattern1.setTransform).not.toBe(canvasPattern2.setTransform);
  });
});
