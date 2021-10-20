import mockWindow from '../../src/window';

let borrowedFromCanvas = [
  'closePath',
  'moveTo',
  'lineTo',
  'bezierCurveTo',
  'quadraticCurveTo',
  'arc',
  'arcTo',
  'ellipse',
  'rect',
];

describe('Path2D', () => {
  test('Path2D', () => {
    const path = new Path2D();
    expect(path).toBeInstanceOf(Path2D);
  });

  it('should have addPath function', () => {
    const p = new Path2D();
    expect(typeof p.addPath).toBe('function');
  });

  it('should have a callable addPath function', () => {
    const p = new Path2D();
    p.addPath(new Path2D());
    expect(p.addPath).toBeCalled();
  });

  it('should borrow some path functions from CanvasRenderingContext2D', () => {
    const p = new Path2D();
    borrowedFromCanvas.forEach((func) => {
      expect(typeof p[func]).toBe('function');
    });
  });

  it('should throw if addPath is called with no parameters', () => {
    expect(() => new Path2D().addPath()).toThrow(TypeError);
  });

  it('should throw if first argument is not Path2D', () => {
    const p = new Path2D();
    [null, 1, void 0, NaN, Infinity, {}, []].forEach((item) => {
      expect(() => p.addPath(item)).toThrow(TypeError);
    });
  });

  test('Path2D different instance', () => {
    const path1 = new Path2D();
    const path2 = new Path2D();
    expect(path1.addPath).not.toBe(path2.addPath);
  });

  test('Path2D not override', () => {
    const saved = window.Path2D;
    mockWindow(window);
    expect(saved === window.Path2D).toBe(true);
  });

  test('Path2D addPath calls _path.push', () => {
    const path1 = new Path2D();
    path1.moveTo(10, 10);
    path1.lineTo(20, 20);
    const path2 = new Path2D();
    path2.moveTo(30, 30);
    path2.lineTo(40, 40);
    expect(path1._path.length).toBe(2);
    path1.addPath(path2);
    expect(path1._path.length).toBe(4);
    expect(path1._path[2]).toBe(path2._path[0]);
    expect(path1._path[3]).toBe(path2._path[1]);
  });
});
