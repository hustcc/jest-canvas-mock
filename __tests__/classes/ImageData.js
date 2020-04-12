describe('ImageData', () => {
  it('should throw if less than 2 arguments are provided', () => {
    expect(() => new ImageData()).toThrow(TypeError);
  });

  it('should throw if more than 3 arguments are provided', () => {
    expect(
      () => new ImageData(new Uint8ClampedArray([0, 0, 0, 1]), 1, 1, 1)
    ).toThrow(TypeError);
  });

  describe('new ImageData(width, height)', () => {
    it('should construct an ImageData object', () => {
      const d = new ImageData(100, 200);
      expect(d).toBeInstanceOf(ImageData);
    });

    it('should construct a Uint8ClampedArray', () => {
      const d = new ImageData(100, 200);
      expect(d.data).toBeInstanceOf(Uint8ClampedArray);
    });

    it('should construct a Uint8ClampedArray of proper size', () => {
      const d = new ImageData(100, 200);
      expect(d.data.length).toBe(100 * 200 * 4);
    });

    it('should set the width and height', () => {
      const d = new ImageData(100, 200);
      expect(d.width).toBe(100);
      expect(d.height).toBe(200);
    });

    it('should throw if width is not finite', () => {
      expect(() => new ImageData(Infinity, 100)).toThrow(RangeError);
    });

    it('should throw if width is 0', () => {
      expect(() => new ImageData(0, 100)).toThrow(RangeError);
    });

    it('should throw if height is not finite', () => {
      expect(() => new ImageData(100, Infinity)).toThrow(RangeError);
    });

    it('should throw if height is 0', () => {
      expect(() => new ImageData(100, 0)).toThrow(RangeError);
    });
  });

  describe('new ImageData(array, width)', () => {
    it('should construct an ImageData object with the right inferred height', () => {
      const data = new Uint8ClampedArray(800);
      const d = new ImageData(data, 200);
      expect(d).toBeInstanceOf(ImageData);
      expect(d.height).toBe(1);
      expect(d.data).toBe(data);
    });

    it('should throw if width is not finite', () => {
      expect(() => new ImageData(new Uint8ClampedArray(4), Infinity)).toThrow(
        RangeError
      );
    });

    it('should throw if width is 0', () => {
      expect(() => new ImageData(new Uint8ClampedArray(4), 0)).toThrow(
        RangeError
      );
    });

    it('should throw if source length is 0', () => {
      expect(() => new ImageData(new Uint8ClampedArray(0), 100)).toThrow(
        RangeError
      );
    });

    it('should throw if source length is not a multiple of 4', () => {
      expect(() => new ImageData(new Uint8ClampedArray(801), 200)).toThrow(
        RangeError
      );
    });
  });

  describe('new ImageData(array, width, height)', () => {
    it('should construct an ImageData object', () => {
      const d = new ImageData(new Uint8ClampedArray([0, 0, 0, 1]), 1, 1);
      expect(d).toBeInstanceOf(ImageData);
    });

    it('should set the width and height', () => {
      const d = new ImageData(new Uint8ClampedArray(80000), 100, 200);
      expect(d.width).toBe(100);
      expect(d.height).toBe(200);
    });

    it('should throw if width is not finite', () => {
      expect(
        () => new ImageData(new Uint8ClampedArray(4), Infinity, 100)
      ).toThrow(RangeError);
    });

    it('should throw if width is 0', () => {
      expect(() => new ImageData(new Uint8ClampedArray(4), 0, 100)).toThrow(
        RangeError
      );
    });

    it('should throw if height is not finite', () => {
      expect(
        () => new ImageData(new Uint8ClampedArray(4), 1, Infinity)
      ).toThrow(RangeError);
    });

    it('should throw if height is 0', () => {
      expect(() => new ImageData(new Uint8ClampedArray(4), 100, 0)).toThrow(
        RangeError
      );
    });

    it('should throw if first argument is not a Uint8ClampedArray', () => {
      expect(() => new ImageData(0, 0, 100)).toThrow(TypeError);
    });

    it('should throw if source length is 0', () => {
      expect(() => new ImageData(new Uint8ClampedArray(0), 100, 100)).toThrow(
        RangeError
      );
    });

    it('should throw if source length is not a multiple of 4', () => {
      expect(() => new ImageData(new Uint8ClampedArray(801), 200, 1)).toThrow(
        RangeError
      );
    });

    it("should throw if width and height aren't compatible with source length ", () => {
      expect(() => new ImageData(new Uint8ClampedArray(8), 2, 2)).toThrow(
        RangeError
      );
      expect(() => new ImageData(new Uint8ClampedArray(8), 1, 7)).toThrow(
        RangeError
      );
      expect(() => new ImageData(new Uint8ClampedArray(8), 7, 1)).toThrow(
        RangeError
      );
    });
  });
});
