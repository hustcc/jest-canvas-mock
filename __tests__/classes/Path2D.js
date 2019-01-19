import mockWindow from '../../src/window';

describe('Path2D', () => {

  test('Path2D', () => {
    const path = new Path2D();

    expect(path).toBeDefined();

    const pathFunctions = [
      'addPath',
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

    pathFunctions.forEach(key => {
      if (typeof path[key] === 'function') {
        path[key]();
      }
    });

    pathFunctions.forEach((key) => {
      expect(path[key]).toBeCalled();
    });

    const otherPath = new Path2D();
    pathFunctions.forEach((key) => {
      expect(otherPath[key]).not.toBeCalled();
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
});
