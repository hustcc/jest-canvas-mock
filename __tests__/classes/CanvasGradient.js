let ctx;
let grd;

beforeEach(() => {
  ctx = document.createElement('canvas').getContext('2d');
  grd = ctx.createLinearGradient(1, 2, 3, 4);
});

describe('CanvasGradient', () => {
  test('CanvasGradient', () => {
    expect(grd).toBeDefined();
    grd.addColorStop(1.0, "blue");
    expect(grd.addColorStop).toBeCalledWith(1.0, 'blue');

    const grd2 = ctx.createLinearGradient(2, 3, 4, 5);
    expect(grd2.addColorStop).not.toBeCalled();
  });

  test('CanvasGradient different instance', () => {
    const grd1 = ctx.createLinearGradient(1, 2, 3, 4);
    const grd2 = ctx.createLinearGradient(1, 2, 3, 4);
    expect(grd1.addColorStop).not.toBe(grd2.addColorStop);
  });

  [Infinity, NaN, -Infinity].forEach(value => {
    test('CanvasGradient should throw if offset is ' + value, () => {
      expect(() => {
        var grd = ctx.createLinearGradient(1, 2, 3, 4);
        grd.addColorStop(value, "blue");
      }).toThrow(DOMException);
    });
  });

  test('CanvasGradient should throw if color cannot be parsed', () => {
    expect(() => {
      var grd = ctx.createLinearGradient(1, 2, 3, 4);
      grd.addColorStop(1, "badcolor");
    }).toThrow(SyntaxError);
  });
});
