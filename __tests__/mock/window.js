import { JSDOM } from 'jsdom';
import mockWindow from '../../src/window';

describe('mockWindow', () => {
  it('mocks the passed object', () => {
    const win = new JSDOM().window;

    mockWindow(win);

    expect(win.Path2D).not.toBeNull();
    expect(win.CanvasGradient).not.toBeNull();
    expect(win.CanvasPattern).not.toBeNull();
    expect(win.CanvasRenderingContext2D).not.toBeNull();
    expect(win.DOMMatrix).not.toBeNull();
    expect(win.ImageData).not.toBeNull();
    expect(win.TextMetrics).not.toBeNull();
    expect(win.ImageBitmap).not.toBeNull();
    expect(win.createImageBitmap).not.toBeNull();

    expect(
      jest.isMockFunction(win.HTMLCanvasElement.prototype.getContext)
    ).toBe(true);
    expect(jest.isMockFunction(win.HTMLCanvasElement.prototype.toBlob)).toBe(
      true
    );
    expect(jest.isMockFunction(win.HTMLCanvasElement.prototype.toDataURL)).toBe(
      true
    );
  });

  it('mocks without a fully formed passed in window object', () => {
    const win = mockWindow({ document: {} });

    expect(win.Path2D).not.toBeNull();
    expect(win.CanvasGradient).not.toBeNull();
    expect(win.CanvasPattern).not.toBeNull();
    expect(win.CanvasRenderingContext2D).not.toBeNull();
    expect(win.DOMMatrix).not.toBeNull();
    expect(win.ImageData).not.toBeNull();
    expect(win.TextMetrics).not.toBeNull();
    expect(win.ImageBitmap).not.toBeNull();
    expect(win.createImageBitmap).not.toBeNull();

    expect(jest.isMockFunction(win.HTMLCanvasElement)).toBe(false);
    expect(win.HTMLCanvasElement).toBeUndefined();
  });
});
