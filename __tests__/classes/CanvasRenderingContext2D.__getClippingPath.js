let ctx;
beforeEach(() => {
  // get a new context each test
  ctx = document.createElement('canvas').getContext('2d');
});

afterEach(() => {
  const drawCalls = ctx.__getClippingRegion();
  expect(drawCalls).toMatchSnapshot();
});

describe('__getClippingRegion', () => {
  it('should be empty when there are no path elements', () => {
    ctx.clip();
  });

  it('should store the clipping region', () => {
    ctx.rect(1, 2, 3, 4);
    ctx.arc(1, 2, 3, 4, 5);
    ctx.clip();
  });

  it("shouldn't store the whole clipping region twice when clip is called twice", () => {
    ctx.rect(1, 2, 3, 4);
    ctx.arc(1, 2, 3, 4, 5);
    ctx.clip();
    ctx.rect(1, 2, 3, 4);
    ctx.arc(1, 2, 3, 4, 5);
    ctx.clip();
  });

  it('should save the clipping region correctly when saved', () => {
    ctx.rect(1, 2, 3, 4);
    ctx.arc(1, 2, 3, 4, 5);
    ctx.clip();
    const region = ctx.__getClippingRegion();
    ctx.save();
    expect(region).toStrictEqual(ctx.__getClippingRegion());
  });

  it('should save the clipping region correctly when saved', () => {
    ctx.rect(1, 2, 3, 4);
    ctx.arc(1, 2, 3, 4, 5);
    ctx.clip();
    const region = ctx.__getClippingRegion();
    ctx.save();
    ctx.rect(1, 2, 3, 4);
    ctx.arc(1, 2, 3, 4, 5);
    ctx.clip();
    expect(region).not.toStrictEqual(ctx.__getClippingRegion());
    ctx.restore();
    expect(region).toStrictEqual(ctx.__getClippingRegion());
  });

  it('should delete current clipping region when restored', () => {
    ctx.rect(1, 2, 3, 4);
    ctx.clip();
    ctx.save();
    ctx.rect(1, 2, 3, 4);
    ctx.arc(1, 2, 3, 4, 5);
    ctx.clip();
    ctx.restore();
    ctx.save();
  });
});
