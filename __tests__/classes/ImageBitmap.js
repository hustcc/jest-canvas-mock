var img = new Image();
img.src = 'test.jpg';

/**
 * If a promise is expected to reject, then this function, when passed to the `.then()` function,
 * will throw -1 instead of the expected error *first*.
 */
function throwError() {
  throw -1;
}

function expectTypeError(e) {
  expect(e).toBeInstanceOf(TypeError);
}

function expectRangeError(e) {
  expect(e).toBeInstanceOf(RangeError);
}

function expectImageBitmap(e) {
  expect(e).toBeInstanceOf(ImageBitmap);
}

describe('image bitmaps', () => {
  it('should be a function', () => {
    expect(typeof createImageBitmap).toBe('function');
  });

  it('should be callable', () => {
    createImageBitmap(img);
    expect(createImageBitmap).toBeCalled();
  });

  it('should return a promise', () => {
    expect(createImageBitmap(img)).toBeInstanceOf(Promise);
  });

  it('should resolve to ImageBitmap', () => {
    return createImageBitmap(img).then(expectImageBitmap);
  });

  it('should resolve to a type error if no parameters are passed to it', () => {
    return createImageBitmap().then(throwError).catch(expectTypeError);
  });

  it('should reject non images', () => {
    return Promise.all(
      [0, null, void 0, '', 'test', window, Infinity, document].map((e) =>
        createImageBitmap(e).then(throwError).catch(expectTypeError)
      )
    );
  });

  it('should reject if second parameter is not an object', () => {
    return Promise.all(
      ['', 0, NaN, Infinity].map((e) => {
        return createImageBitmap(img, e)
          .then(throwError)
          .catch(expectTypeError);
      })
    );
  });

  it('should throw if arity is 3 or 4', () => {
    return Promise.all([
      createImageBitmap(img, 1, 2).then(throwError).catch(expectTypeError),
      createImageBitmap(img, 1, 2, 3).then(throwError).catch(expectTypeError),
    ]);
  });

  it('should accept 5 parameters if the last 4 parameters are numbers', () => {
    return createImageBitmap(img, 1, 2, 3, 4).then(expectImageBitmap);
  });

  it('should throw if width or height is not finite or 0', () => {
    return Promise.all([
      createImageBitmap(img, 1, 2, NaN, 3)
        .then(throwError)
        .catch(expectRangeError),
      createImageBitmap(img, 1, 2, 0, 3)
        .then(throwError)
        .catch(expectRangeError),
      createImageBitmap(img, 1, 2, 3, NaN)
        .then(throwError)
        .catch(expectRangeError),
      createImageBitmap(img, 1, 2, 3, 0)
        .then(throwError)
        .catch(expectRangeError),
    ]);
  });

  it('should throw if last parameter is not object if source rect is provided', () => {
    return Promise.all(
      ['', 0, NaN, Infinity].map((e) =>
        createImageBitmap(img, 1, 2, 3, 4, e)
          .then(throwError)
          .catch(expectTypeError)
      )
    );
  });

  it('should have a close function', () => {
    return createImageBitmap(img).then((e) => {
      expect(typeof e.close).toBe('function');
    });
  });

  it('should have a callable close function', () => {
    return createImageBitmap(img).then((e) => {
      e.close();
      expect(e.close).toBeCalled();
    });
  });

  it('should close the bitmap', () => {
    return createImageBitmap(img).then((e) => {
      e.close();
      expect(e.width).toBe(0);
      expect(e.height).toBe(0);
      expect(e._closed).toBe(true);
    });
  });

  it('should create image bitmaps from valid sources', () => {
    return Promise.all(
      [
        document.createElement('img'),
        new Image(),
        document.createElement('canvas'),
        document.createElement('video'),
        new Blob([new Uint8Array(1)]),
        new ImageData(400, 300),
        new ImageBitmap(100, 100), // this is just to verify class input
      ].map((e) => createImageBitmap(e).then(expectImageBitmap))
    );
  });

  it('should reject if sixth parameter is not an object', () => {
    return Promise.all(
      ['', 0, NaN, Infinity].map((e) => {
        return createImageBitmap(img, 1, 2, 3, 4, e)
          .then(throwError)
          .catch(expectTypeError);
      })
    );
  });

  it('should accept if sixth parameter is null, undefined, or object', () => {
    return Promise.all(
      [null, void 0, {}].map((e) => {
        return createImageBitmap(img, 1, 2, 3, 4, e).then(expectImageBitmap);
      })
    );
  });
});
