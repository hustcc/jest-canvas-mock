let canvas;

beforeEach(() => {
  canvas = document.createElement('canvas');
});

describe('mock', () => {
  it('context creation of type 2d returns CanvasRenderingContext2D', () => {
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
    canvas.toBlob((e) => {});
    expect(canvas.toBlob).toBeCalled();
  });

  it('should expect toBlob to return Blob', () => {
    return new Promise((resolve, reject) => {
      canvas.toBlob((e) => {
        var ex;
        try {
          expect(e).toBeInstanceOf(window.Blob);
        } catch (ex) {
          return reject(ex);
        }
        resolve();
      });
    });
  });

  it('should throw if toBlob is provided less than 1 argument', () => {
    expect(() => canvas.toBlob()).toThrow(TypeError);
  });

  it('should throw if toBlob is provided with no callback', () => {
    expect(() => canvas.toBlob(1)).toThrow(TypeError);
  });

  it('should accept image/jpeg', () => {
    return new Promise((resolve, reject) => {
      canvas.toBlob((e) => {
        var ex;
        try {
          expect(e.type).toBe('image/jpeg');
        } catch (ex) {
          return reject(ex);
        }
        resolve();
      }, 'image/jpeg');
    });
  });

  it('should accept image/webp', () => {
    return new Promise((resolve, reject) => {
      canvas.toBlob((e) => {
        var ex;
        try {
          expect(e.type).toBe('image/webp');
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

  it('context creation of any other type returns null', () => {
    expect(document.createElement('canvas').getContext('webgl')).toBe(null);
  });

  /**
   * This test is very special, because it helps increase the code coverage to 100%. It patches
   * console.error to supress calls to console.error, sets an internal dataset value to force the
   * getContext() function to call it's internal getContext() provided by jsdom.
   */
  it('should call internal function if "canvas" is installed', () => {
    const error = console.error;
    console.error = () => void 0;
    canvas.dataset.internalRequireTest = true;
    canvas.getContext('webgl');
    console.error = error;
  });

  it('should return the same context if getContext("2d") is called twice', () => {
    const first = canvas.getContext('2d');
    const second = canvas.getContext('2d');
    expect(first).toBe(second);
  });
});
