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

  it("should createImagePatterns", () => {
    var img = new Image();
    img.src = "http://some-domain.com/my-image.png";
    var result = ctx.createPattern(img, "no-repeat");
    expect(result).toBeInstanceOf(CanvasPattern);
  });

  it("shouldn't create image patterns when argument length is 1", () => {
    var img = new Image();
    img.src = "http://some-domain.com/my-image.png";
    expect(() => ctx.createPattern(img)).toThrow(TypeError);
  });

  it("shouldn't create image patterns when second argument is undefined", () => {
    var img = new Image();
    img.src = "http://some-domain.com/my-image.png";
    expect(() => ctx.createPattern(img, void 0)).toThrow(TypeError);
  });

  it("should create image patterns when second argument is null", () => {
    var img = new Image();
    img.src = "http://some-domain.com/my-image.png";
    expect(ctx.createPattern(img, null)).toBeInstanceOf(CanvasPattern);
  });

  it("should create image patterns when second argument is empty string", () => {
    var img = new Image();
    img.src = "http://some-domain.com/my-image.png";
    expect(ctx.createPattern(img, "")).toBeInstanceOf(CanvasPattern);
  });

  it("shouldn't create imagePattern when image is not valid", () => {
    expect(() => ctx.createPattern(null, "repeat")).toThrow();
  });

  it("should create a pattern when image is Video", () => {
    var video = document.createElement("video");
    expect(ctx.createPattern(video, "repeat")).toBeInstanceOf(CanvasPattern);
  });

  it("should create a pattern when image is Canvas", () => {
    var canvas = document.createElement("canvas");
    expect(ctx.createPattern(canvas, "repeat")).toBeInstanceOf(CanvasPattern);
  });

  it("should create a valid pattern for all repeat types", () => {
    var image = new Image();
    image.src = "test/myImage.jpg";

    ["repeat", "repeat-x", "repeat-y", "no-repeat"].forEach(e => {
      expect(ctx.createPattern(image, e)).toBeInstanceOf(CanvasPattern);
    });
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
    expect(ctx.direction).toBe("ltr");
    ctx.direction = "rtl";
    expect(ctx.direction).toBe("rtl");
    ctx.direction = "inherit";
    expect(ctx.direction).toBe("inherit");
  });

  it("should save and restore direction values", () => {
    ctx.direction = "ltr";
    ctx.save();
    ctx.direction = "rtl";
    expect(ctx.direction).toBe("rtl");
    ctx.restore();
    expect(ctx.direction).toBe("ltr");
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

  // this test just verifies that any kind of color changes the fillStyle property
  it("should parse a css color string 'blue'", () => {
    ctx.fillStyle = "blue";
    expect(ctx.fillStyle).toBe("#0000ff");
  });

  it("should not parse invalid colors", () => {
    ctx.fillStyle = "invalid!";
    expect(ctx.fillStyle).toBe("#000");
  });

  it("should save and restore fillStyle values", () => {
    ctx.fillStyle = "green";
    ctx.save();
    ctx.fillStyle = "red";
    expect(ctx.fillStyle).toBe("#ff0000");
    ctx.restore();
    expect(ctx.fillStyle).toBe("#008000");
  });

});