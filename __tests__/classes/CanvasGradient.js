import mockWindow from '../../src/window';

describe('CanvasGradient', () => {

  test('CanvasGradient', () => {
    const canvasGradient = new CanvasGradient();

    expect(canvasGradient).toBeDefined();

    canvasGradient.addColorStop();

    expect(canvasGradient.addColorStop).toBeCalled();

    const other = new CanvasGradient();
    expect(other.addColorStop).not.toBeCalled();
  });

  test('CanvasGradient different instance', () => {
    const canvasGradient1 = new CanvasGradient();
    const canvasGradient2 = new CanvasGradient();
    expect(canvasGradient1.addColorStop).not.toBe(canvasGradient2.addColorStop);
  });

  test('CanvasGradient not override', () => {
    const saved = window.CanvasGradient;
    mockWindow(window);
    expect(saved === window.CanvasGradient).toBe(true);
  });
});
