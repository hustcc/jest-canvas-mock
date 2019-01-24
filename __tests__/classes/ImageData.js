import ImageData from "../../src/classes/ImageData";

describe("ImageData", () => {
  it("should construct an ImageData object", () => {
    var d = new ImageData(100, 200);
    expect(d).toBeInstanceOf(ImageData);
  });

  it("should construct a Uint8ClampedArray", () => {
    var d = new ImageData(100, 200);
    expect(d.data).toBeInstanceOf(Uint8ClampedArray);
  });

  it("should construct a Uint8ClampedArray of proper size", () => {
    var d = new ImageData(100, 200);
    expect(d.data.length).toBe(100 * 200 * 4);
  });

  it("should set the width and height", () => {
    var d = new ImageData(100, 200);
    expect(d.width).toBe(100);
    expect(d.height).toBe(200);
  });

  it("should throw if width is not finite", () => {
    expect(() => new ImageData(Infinity, 100)).toThrow(TypeError);
  });

  it("should throw if width is 0", () => {
    expect(() => new ImageData(0, 100)).toThrow(TypeError);
  });

  it("should throw if height is not finite", () => {
    expect(() => new ImageData(100, Infinity)).toThrow(TypeError);
  });

  it("should throw if height is 0", () => {
    expect(() => new ImageData(100, 0)).toThrow(TypeError);
  });


});