let ctx;
let grd;

beforeEach(() => {
  ctx = document.createElement('canvas').getContext('2d');
  grd = ctx.createLinearGradient(1, 2, 3, 4);
});

describe('CanvasGradient', () => {
  test('CanvasGradient', () => {
    expect(grd).toBeDefined();
    grd.addColorStop(1.0, 'blue');
    expect(grd.addColorStop).toBeCalledWith(1.0, 'blue');

    const grd2 = ctx.createLinearGradient(2, 3, 4, 5);
    expect(grd2.addColorStop).not.toBeCalled();
  });

  test('CanvasGradient different instance', () => {
    const grd1 = ctx.createLinearGradient(1, 2, 3, 4);
    const grd2 = ctx.createLinearGradient(1, 2, 3, 4);
    expect(grd1.addColorStop).not.toBe(grd2.addColorStop);
  });

  [Infinity, NaN, -Infinity].forEach((value) => {
    test('CanvasGradient should throw if offset is ' + value, () => {
      const fn = () => {
        var grd = ctx.createLinearGradient(1, 2, 3, 4);
        grd.addColorStop(value, 'blue');
      };
      expect(fn).toThrow(DOMException);
      expect(fn).toThrow('is outside the range');
    });
  });

  test('should accept all valid CSS colors as a color stop', () => {
    const grd = ctx.createLinearGradient(0, 0, 100, 100);
    expect(() => {
      grd.addColorStop(0.1, 'blue');
      grd.addColorStop(0.2, '#f008');
      grd.addColorStop(0.2, '#f0f0f0');
      grd.addColorStop(0.3, '#f0f0f0f0');
      grd.addColorStop(0.3, 'rgb(10, 10, 10)');
      grd.addColorStop(0.4, 'rgb(100%, 25%, 25%)');
      grd.addColorStop(0.3, 'rgba(100, 100, 100, 0.5)');
      grd.addColorStop(0.4, 'hsl(180, 100%, 50%)');
      grd.addColorStop(0.5, 'hsla(180, 100%, 50%, 0.5)');
      grd.addColorStop(0.0, 'transparent');
    }).not.toThrow(SyntaxError);
  });

  test('CanvasGradient should throw if color cannot be parsed', () => {
    const grd = ctx.createLinearGradient(1, 2, 3, 4);
    expect(() => {
      grd.addColorStop(0.5, 'invalid');
    }).toThrow(SyntaxError);

    expect(() => {
      grd.addColorStop(0.5, 'rgb(50%, 0, 50%)');
    }).toThrow(SyntaxError);

    expect(() => {
      grd.addColorStop(0.5, 'hsl(180, 50%, 50)');
    }).toThrow(SyntaxError);
  });
});
