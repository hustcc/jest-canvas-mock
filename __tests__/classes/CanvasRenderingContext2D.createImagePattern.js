var canvas;
var ctx;

beforeEach(() => {
  canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = 400;
  canvas.height = 300;
});

describe("createImagePattern", () => {
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
})