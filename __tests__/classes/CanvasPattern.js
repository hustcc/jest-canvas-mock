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
    const ptrn = ctx.createPattern(img, 'no-repeat');
    expect(ptrn).toBeDefined();
    expect(ptrn).toBeInstanceOf(CanvasPattern);
  });

  it('should have a setTransform function', () => {
    const ptrn = ctx.createPattern(img, 'no-repeat');
    expect(typeof ptrn.setTransform).toBe('function');
  });

  it('should have callable setTransform', () => {
    const ptrn = ctx.createPattern(img, 'no-repeat');
    ptrn.setTransform(ctx.getTransform());
    expect(ptrn.setTransform).toBeCalled();
  });

  it('should throw if arguments.length > 0 and transform not instanceof Object', () => {
    const ptrn = ctx.createPattern(img, 'no-repeat');
    expect(() => ptrn.setTransform(1)).toThrow(TypeError);
  });

  test('CanvasPattern different instance', () => {
    const ptrn1 = ctx.createPattern(img, 'no-repeat');
    const ptrn2 = ctx.createPattern(img, 'no-repeat');
    expect(ptrn1.setTransform).not.toBe(ptrn2.setTransform);
  });
});
