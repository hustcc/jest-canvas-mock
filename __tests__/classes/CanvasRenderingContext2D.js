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
});
