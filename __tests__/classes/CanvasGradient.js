let ctx;
let grd;

beforeEach(() => {
  ctx = document.createElement('canvas').getContext('2d');
  grd = ctx.createLinearGradient(1, 2, 3, 4);
});

describe('CanvasGradient', () => {

  test('CanvasGradient', () => {

    expect(grd).toBeDefined();
    grd.addColorStop();
    expect(grd.addColorStop).toBeCalled();

    const grd2 = ctx.createLinearGradient(2, 3, 4, 5);
    expect(grd2.addColorStop).not.toBeCalled();
  });

  test('CanvasGradient different instance', () => {
    const canvasGradient1 = new CanvasGradient();
    const canvasGradient2 = new CanvasGradient();
    expect(canvasGradient1.addColorStop).not.toBe(canvasGradient2.addColorStop);
  });
});
