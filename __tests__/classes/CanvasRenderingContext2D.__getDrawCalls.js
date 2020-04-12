let ctx;
beforeEach(() => {
  // get a new context each test
  ctx = document.createElement('canvas').getContext('2d');
});

const img = new Image();
img.src = 'https://placekitten.com/400/300';
img.width = 400;
img.height = 300;

const path = new Path2D();
path.arc(100, 101, 10, 0, Math.PI * 2);

afterEach(() => {
  const drawCalls = ctx.__getDrawCalls();
  expect(drawCalls).toMatchSnapshot();
});

describe('__getDrawCalls', () => {
  it('should have a draw call when clearRect is called', () => {
    ctx.clearRect(1, 2, 3, 4);
  });

  it('should not have a draw call when clearRect is passed bad values', () => {
    ctx.clearRect(NaN, 1, 2, 3);
  });

  it('should have a draw call when fillRect is called', () => {
    ctx.fillRect(1, 2, 3, 4);
  });

  it('should not have a draw call when fillRect is passed bad values', () => {
    ctx.fillRect(NaN, 1, 2, 3);
  });

  it('should have a draw call when strokeRect is called', () => {
    ctx.strokeRect(1, 2, 3, 4);
  });

  it('should not have a draw call when strokeRect is passed bad values', () => {
    ctx.strokeRect(NaN, 1, 2, 3);
  });

  it('should have a draw call when drawImage is called', () => {
    ctx.drawImage(img, 0, 0);
  });

  it('should not have a draw call when drawImage is called with non-finite numbers', () => {
    ctx.drawImage(img, NaN, 0);
  });

  it('should have a draw call when drawImage is called with size parameters', () => {
    ctx.drawImage(img, 0, 0, 100, 100);
  });

  it('should not have a draw call when drawImage is called with non-finite numbers and size parameters', () => {
    ctx.drawImage(img, NaN, 0, 100, 100);
  });

  it('should have a draw call when drawImage is called with source parameters', () => {
    ctx.drawImage(img, 0, 0, 100, 100, 0, 0, 200, 200);
  });

  it('should not have a draw call when drawImage is called with non-finite numbers and source parameters', () => {
    ctx.drawImage(img, NaN, 0, 100, 100, 0, 0, 200, 200);
  });

  it('should have a draw call when fill() is called', () => {
    ctx.beginPath();
    ctx.arc(100, 101, 10, 0, Math.PI * 2);
    ctx.fill();
  });

  it('should have a draw call when fill() is called with a fillRule', () => {
    ctx.beginPath();
    ctx.arc(100, 101, 10, 0, Math.PI * 2);
    ctx.fill('evenodd');
  });

  it('should have a draw call when using a path', () => {
    ctx.fill(path);
  });

  it('should have a draw call when fillRule is valid', () => {
    ctx.fill(path, 'evenodd');
  });

  it('should have a draw call when fillText is valid', () => {
    ctx.fillText('hello world', 0, 0);
  });

  it('should have a draw call when fillText has valid maxWidth', () => {
    ctx.fillText('hello world', 0, 0, 100);
  });

  it('should not have a draw call when fillText is not valid', () => {
    ctx.fillText('hello world', 0, NaN);
  });

  it('should not have a draw call when fillText is not valid', () => {
    ctx.fillText('hello world', 0, 0, NaN);
  });

  it('should have a draw call when strokeText is valid', () => {
    ctx.strokeText('hello world', 0, 0);
  });

  it('should have a draw call when strokeText has valid maxWidth', () => {
    ctx.strokeText('hello world', 0, 0, 100);
  });

  it('should not have a draw call when strokeText is not valid', () => {
    ctx.strokeText('hello world', 0, NaN);
  });

  it('should not have a draw call when strokeText is not valid', () => {
    ctx.strokeText('hello world', 0, 0, NaN);
  });

  it('should have a draw call when stroke is called', () => {
    ctx.beginPath();
    ctx.arc(100, 101, 10, 0, Math.PI * 2);
    ctx.stroke();
  });

  it('should have a draw call when stroke is called with a path', () => {
    ctx.stroke(path);
  });
});
