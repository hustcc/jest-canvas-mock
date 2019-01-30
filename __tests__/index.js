/**
 * test canvas
 */

import { ver } from '../src';
import pkg from '../package.json';

let canvas;

beforeEach(() => {
  canvas = document.createElement('canvas');
});

describe('canvas', () => {
  test('version', () => {
    expect(ver).toBe(pkg.version);
  });

  test('context creation of type 2d returns CanvasRenderingContext2D', () => {
    const ctx = canvas.getContext('2d');
    expect(ctx).toBeInstanceOf(CanvasRenderingContext2D);
  });

  it('should expect getContext to be called', () => {
    canvas.getContext('2d');
    expect(canvas.getContext).toBeCalled();
  });

  it('should have a toBlob function', () => {
    expect(typeof canvas.toBlob).toBe('function');
  });

  it('should expect toBlob to be callable', () => {
    canvas.toBlob(e => {});
    expect(canvas.toBlob).toBeCalled();
  });

  it('should expect toBlob to return Blob', () => {
    return new Promise((resolve, reject) => {
      canvas.toBlob(e => {
        var ex;
        try {
          expect(e).toBeInstanceOf(window.Blob);
        } catch (ex) {
          return reject(ex);
        }
        resolve();
      });
    })
  });

  it('should throw if toBlob is provided less than 1 argument', () => {
    expect(() => canvas.toBlob()).toThrow(TypeError);
  });

  it('should throw if toBlob is provided with no callback', () => {
    expect(() => canvas.toBlob(1)).toThrow(TypeError);
  });

  it('should accept image/jpeg', () => {
    return new Promise((resolve, reject) => {
      canvas.toBlob(e => {
        var ex;
        try {
          expect(e.type).toBe('image/jpeg')
        } catch (ex) {
          return reject(ex);
        }
        resolve();
      }, 'image/jpeg');
    });
  });

  it('should accept image/webp', () => {
    return new Promise((resolve, reject) => {
      canvas.toBlob(e => {
        var ex;
        try {
          expect(e.type).toBe('image/webp')
        } catch (ex) {
          return reject(ex);
        }
        resolve();
      }, 'image/webp');
    });
  });

  it('should have toDataURL function', () => {
    expect(typeof canvas.toDataURL).toBe('function');
  });

  it('should expect canvas toDataURL to be callable', () => {
    canvas.toDataURL();
    expect(canvas.toDataURL).toBeCalled();
  });

  it('should expect canvas toDataURL to always return string', () => {
    expect(canvas.toDataURL()).toBe('data:image/png;base64,00');
  });

  it('should accept image/jpeg', () => {
    expect(canvas.toDataURL('image/jpeg')).toMatch(/image\/jpeg/);
  });

  it('should accept image/webp', () => {
    expect(canvas.toDataURL('image/webp')).toMatch(/image\/webp/);
  });

  test('context creation of any other type returns null', () => {
    expect(document.createElement('canvas').getContext('webgl')).toBe(null);
  });
});
