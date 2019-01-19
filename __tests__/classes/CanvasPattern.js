import mockWindow from '../../src/window';

describe('CanvasPattern', () => {

  test('CanvasPattern', () => {
    const canvasPattern = new CanvasPattern();

    expect(canvasPattern).toBeDefined();

    canvasPattern.setTransform();

    expect(canvasPattern.setTransform).toBeCalled();

    const other = new CanvasPattern();
    expect(other.setTransform).not.toBeCalled();
  });

  test('CanvasPattern different instance', () => {
    const canvasPattern1 = new CanvasPattern();
    const canvasPattern2 = new CanvasPattern();
    expect(canvasPattern1.setTransform).not.toBe(canvasPattern2.setTransform);
  });

  test('CanvasPattern not override', () => {
    const saved = window.CanvasPattern;
    mockWindow(window);
    expect(saved === window.CanvasPattern).toBe(true);
  });
});
