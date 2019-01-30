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
    const grd1 = ctx.createLinearGradient(1, 2, 3, 4);
    const grd2 = ctx.createLinearGradient(1, 2, 3, 4);
    expect(grd1.addColorStop).not.toBe(grd2.addColorStop);
  });
});
