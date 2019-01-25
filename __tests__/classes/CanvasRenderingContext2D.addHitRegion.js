var canvas;
var ctx;

beforeEach(() => {
  canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = 400;
  canvas.height = 300;
});

describe("addHitRegion", () => {
  it("should be a function", () => {
    expect(ctx.addHitRegion).toBeTruthy();
  });

  it("should throw if called with no parameters", () => {
    expect(() => ctx.addHitRegion()).toThrow(DOMException);
  });
});
