let ctx;
beforeEach(() => {
  // get a new context each test
  ctx = document.createElement('canvas').getContext('2d');
});

const path = new Path2D();
path.arc(100, 101, 10, 0, Math.PI * 2);

afterEach(() => {
  const drawCalls = ctx.__getPath();
  expect(drawCalls).toMatchSnapshot();
});

describe('__getPath', () => {
  it('should have a path item when arc is called', () => {
    ctx.arc(1, 2, 3, 4, 5, true);
  });

  it('should not have a path item when arc is called with a non-finite number', () => {
    ctx.arc(NaN, 2, 3, 4, 5, false);
  });

  it('should have a path item when arcTo is called', () => {
    ctx.arcTo(1, 2, 3, 4, 5);
  });

  it('should not have a path item when arcTo is called with a non-finite number', () => {
    ctx.arcTo(NaN, 2, 3, 4, 5);
  });

  it('should reset the path with beginPath', () => {
    ctx.arc(1, 2, 3, 4, 5, true);
    ctx.arc(1, 2, 3, 4, 5, true);
    ctx.arc(1, 2, 3, 4, 5, true);
    ctx.arc(1, 2, 3, 4, 5, true);
    ctx.beginPath();
  });

  it('should have a path item when bezierCurveTo is called', () => {
    ctx.bezierCurveTo(1, 2, 3, 4, 5, 6);
  });

  it('should not have a path item when bezierCurveTo is called with a non-finite number', () => {
    ctx.bezierCurveTo(NaN, 2, 3, 4, 5, 6);
  });

  it('should have a path item when clip is called', () => {
    ctx.rect(1, 2, 3, 4);
    ctx.clip();
  });

  it('should have a path item when clip is called with a fillRule', () => {
    ctx.rect(1, 2, 3, 4);
    ctx.clip('evenodd');
  });

  it('should have a path item when clip is called with a path', () => {
    ctx.clip(path);
  });

  it('should have a path item when clip is called with a path', () => {
    ctx.clip(path, 'evenodd');
  });

  it('should have a path item when closePath is called', () => {
    ctx.closePath();
  });

  it('should have a path item when ellipse is called', () => {
    ctx.ellipse(1, 2, 3, 4, 5, 6, 7, true);
  });

  it('should not have a path item when ellipse is called with non-finite numbers', () => {
    ctx.ellipse(NaN, 2, 3, 4, 5, 6, 7, false);
  });

  it('should have a path item when lineTo is called', () => {
    ctx.lineTo(1, 2);
  });

  it('should not have a path item when lineTo is called with non-finite values', () => {
    ctx.lineTo(NaN, 0);
  });

  it('should have a path item when moveTo is called', () => {
    ctx.moveTo(1, 2);
  });

  it('should not have a path item when moveTo is called with non-finite values', () => {
    ctx.moveTo(NaN, 1);
  });

  it('should have a path item when quadraticCurveTo is called', () => {
    ctx.quadraticCurveTo(1, 2, 3, 4);
  });

  it('should not have a path item when quadraticCurveTo is called with non-finite values', () => {
    ctx.quadraticCurveTo(NaN, 2, 3, 4);
  });

  it('should have a path item when rect is called', () => {
    ctx.rect(1, 2, 3, 4);
  });

  it('should not have a path item when rect is called with non-finite values', () => {
    ctx.rect(NaN, 2, 3, 4);
  });
});
