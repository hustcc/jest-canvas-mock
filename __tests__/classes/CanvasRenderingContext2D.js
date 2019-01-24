import DOMMatrix from "../../src/classes/DOMMatrix";
import ImageData from "../../src/classes/ImageData";

var canvas;
var ctx;


beforeEach(() => {
  canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = 400;
  canvas.height = 300;
});

describe("CanvasRenderingContext2D prototype", () => {
  it("should have a canvas property", () => {
    expect(ctx.canvas).toBe(canvas);
  });

  it("should return a DOMMatrix when accessing the currentTransform property", () => {
    expect(ctx.currentTransform).toBeInstanceOf(DOMMatrix);
  });

  it("should set the current transform of the context when setting the currentTransform property", () => {
    var matrix = new DOMMatrix([1, 2, 3, 4, 5, 6]);
    ctx.currentTransform = matrix;
    expect(ctx._transformStack[0][0]).toBe(1);
    expect(ctx._transformStack[0][1]).toBe(2);
    expect(ctx._transformStack[0][2]).toBe(3);
    expect(ctx._transformStack[0][3]).toBe(4);
    expect(ctx._transformStack[0][4]).toBe(5);
    expect(ctx._transformStack[0][5]).toBe(6);
  });

  it("should set the default value direction to 'inherit'", () => {
    expect(ctx.direction).toBe("inherit");
  });

  it("should set the direction if it's a valid direction", () => {
    ctx.direction = "wrong!";
    expect(ctx.direction).toBe("inherit");
  });

  it("should set the direction if it's a valid direction", () => {
    ctx.direction = "ltr";
    expect(ctx.direct).toBe("ltr");
    ctx.direction = "rtl";
    expect(ctx.direct).toBe("rtl");
    ctx.direction = "inherit";
    expect(ctx.direction).toBe("inherit");
  });

  it("should return a image data from getImageData", () => {
    expect(ctx.getImageData()).toBeInstanceOf(ImageData);
  });

  it("should return a image data from getImageData of proper size", () => {
    var data = ctx.getImageData();
    expect(data.width).toBe(400);
    expect(data.height).toBe(300);
    expect(data.data.length).toBe(400 * 300 * 4);
  });

});