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

const imgData = new ImageData(100, 100);

afterEach(() => {
  const drawCalls = ctx.__getEvents();
  expect(drawCalls).toMatchSnapshot();
});

describe('__getEvents', () => {
  it('should have an event when addHitRegion is called', () => {
    ctx.addHitRegion({ id: 'test' });
  });

  it('should have an event when arc is called', () => {
    ctx.arc(1, 2, 3, 4, 5, true);
  });

  it('should not have an event when arc is called with a non-finite number', () => {
    ctx.arc(NaN, 2, 3, 4, 5, false);
  });

  it('should have an event when arcTo is called', () => {
    ctx.arcTo(1, 2, 3, 4, 5);
  });

  it('should not have an event when arcTo is called with a non-finite number', () => {
    ctx.arcTo(NaN, 2, 3, 4, 5);
  });

  it('should have an event when beginPath is called', () => {
    ctx.beginPath();
  });

  it('should have an event when bezierCurveTo is called', () => {
    ctx.bezierCurveTo(1, 2, 3, 4, 5, 6);
  });

  it('should not have an event when bezierCurveTo is called with a non-finite number', () => {
    ctx.bezierCurveTo(NaN, 2, 3, 4, 5, 6);
  });

  it('should have an event when clearHitRegions is called', () => {
    ctx.clearHitRegions();
  });

  it('should have an event when clearRect is called', () => {
    ctx.clearRect(1, 2, 3, 4);
  });

  it('should not have an event when clearRect is passed bad values', () => {
    ctx.clearRect(NaN, 1, 2, 3);
  });

  it('should have an event when clip is called', () => {
    ctx.rect(1, 2, 3, 4);
    ctx.clip();
  });

  it('should have an event when clip is called with a fillRule', () => {
    ctx.rect(1, 2, 3, 4);
    ctx.clip('evenodd');
  });

  it('should have an event when clip is called with a path', () => {
    ctx.clip(path);
  });

  it('should have an event when clip is called with a path', () => {
    ctx.clip(path, 'evenodd');
  });

  it('should have an event when closePath is called', () => {
    ctx.closePath();
  });

  it('should have an event when createImageData is called', () => {
    ctx.createImageData(100, 100);
  });

  it('should have an event when createLinearGradient is called', () => {
    ctx.createLinearGradient(1, 2, 3, 4);
  });

  it('should have an event when createPattern is called', () => {
    ctx.createPattern(img, 'no-repeat');
  });

  it('should have an event when createRadialGradient is called', () => {
    ctx.createLinearGradient(1, 2, 3, 4, 5, 6);
  });

  it('should create an event when currentTransform is set', () => {
    const t = ctx.currentTransform;
    t.a = 1;
    t.b = 2;
    t.c = 3;
    t.d = 4;
    t.e = 5;
    t.f = 6;
    ctx.currentTransform = t;
  });

  it('should create an event when direction is set', () => {
    ctx.direction = 'rtl';
  });

  it('should not create an event when direction is invalid', () => {
    ctx.direction = 'testing';
  });

  it('should create an event when the drawFocusIsNeeded function is called without a path', () => {
    const button = document.createElement('button');
    ctx.drawFocusIfNeeded(button);
  });

  it('should create an event when drawFocusIfNeeded is called', () => {
    const button = document.createElement('button');
    ctx.drawFocusIfNeeded(path, button);
  });

  it('should have a event when drawImage is called', () => {
    ctx.drawImage(img, 0, 0);
  });

  it('should not have a event when drawImage is called with non-finite numbers', () => {
    ctx.drawImage(img, NaN, 0);
  });

  it('should have a event when drawImage is called with size parameters', () => {
    ctx.drawImage(img, 0, 0, 100, 100);
  });

  it('should not have a event when drawImage is called with non-finite numbers and size parameters', () => {
    ctx.drawImage(img, NaN, 0, 100, 100);
  });

  it('should have a event when drawImage is called with source parameters', () => {
    ctx.drawImage(img, 0, 0, 100, 100, 0, 0, 200, 200);
  });

  it('should not have a event when drawImage is called with non-finite numbers and source parameters', () => {
    ctx.drawImage(img, NaN, 0, 100, 100, 0, 0, 200, 200);
  });

  it('should have an event when ellipse is called', () => {
    ctx.ellipse(1, 2, 3, 4, 5, 6, 7, true);
  });

  it('should not have an event when ellipse is called with non-finite numbers', () => {
    ctx.ellipse(NaN, 2, 3, 4, 5, 6, 7, false);
  });

  it('should have a event when fill() is called', () => {
    ctx.beginPath();
    ctx.arc(100, 101, 10, 0, Math.PI * 2);
    ctx.fill();
  });

  it('should have a event when fill() is called with a fillRule', () => {
    ctx.beginPath();
    ctx.arc(100, 101, 10, 0, Math.PI * 2);
    ctx.fill('evenodd');
  });

  it('should have a event when using a path', () => {
    ctx.fill(path);
  });

  it('should have a event when fillRule is valid', () => {
    ctx.fill(path, 'evenodd');
  });

  it('should have a event when fillRect is called', () => {
    ctx.fillRect(1, 2, 3, 4);
  });

  it('should not have a event when fillRect is passed bad values', () => {
    ctx.fillRect(NaN, 1, 2, 3);
  });

  it('should have an event when fillStyle is set', () => {
    ctx.fillStyle = 'blue';
  });

  it('should not have an event when fillStyle is set with invalid input', () => {
    ctx.fillStyle = 'testing';
  });

  it('should have a event when fillText is valid', () => {
    ctx.fillText('hello world', 0, 0);
  });

  it('should have a event when fillText has valid maxWidth', () => {
    ctx.fillText('hello world', 0, 0, 100);
  });

  it('should not have a event when fillText is not valid', () => {
    ctx.fillText('hello world', 0, NaN);
  });

  it('should not have a event when fillText is not valid', () => {
    ctx.fillText('hello world', 0, 0, NaN);
  });

  it('should have an event when filter is set', () => {
    ctx.filter = 'test'; // no input is validated
  });

  it('should have an event when font is set', () => {
    ctx.font = '12pt Comic Sans';
  });

  it('should not have an event when the font is not valid', () => {
    ctx.font = 'invalid input';
  });

  it('should have an event when globalAlpha is set', () => {
    ctx.globalAlpha = 0.5;
  });

  it('should not have an event when globalAlpha is invalid', () => {
    ctx.globalAlpha = NaN;
  });

  it('should have an event when the globalCompositeOperation is set', () => {
    ctx.globalCompositeOperation = 'source-in';
  });

  it('should not have an event when the globalCompositeOperation is invalid', () => {
    ctx.globalCompositeOperation = 'bad-operation';
  });

  it('should have an event when the imageSmoothingEnabled property is set', () => {
    ctx.imageSmoothingEnabled = true;
  });

  it('should have an event when the imageSmoothingQuality property is set', () => {
    ctx.imageSmoothingQuality = 'high';
  });

  it('should not have an event when imageSmoothingQuality is invalid', () => {
    ctx.imageSmoothingQuality = 'invalid';
  });

  it('should have an event when isPointInPath is called', () => {
    ctx.isPointInPath(1, 2);
  });

  it('should have an event when isPointInStroke is called', () => {
    ctx.isPointInStroke(1, 2);
  });

  it('should have an event when lineCap is set', () => {
    ctx.lineCap = 'round';
  });

  it('should not have an event when lineCap is invalid', () => {
    ctx.lineCap = 'bad-line-cap';
  });

  it('should have an event when lineDashOffset is set', () => {
    ctx.lineDashOffset = 10;
  });

  it('should not have an event when lineDashOffset is invalid', () => {
    ctx.lineDashOffset = NaN;
  });

  it('should have an event when lineJoin is set', () => {
    ctx.lineJoin = 'round';
  });

  it('should not have an event when lineJoin is invalid', () => {
    ctx.lineJoin = 'bad-line-join';
  });

  it('should have an event when lineTo is called', () => {
    ctx.lineTo(1, 2);
  });

  it('should not have an event when lineTo is called with non-finite values', () => {
    ctx.lineTo(NaN, 0);
  });

  it('should have an event when lineWidth is set', () => {
    ctx.lineWidth = 10;
  });

  it('should not have an event when lineWidth is invalid', () => {
    ctx.lineWidth = NaN;
  });

  it('should have an event when measureText is called', () => {
    ctx.measureText('hello world!');
  });

  it('should have an event when miterLimit is set', () => {
    ctx.miterLimit = 12;
  });

  it('should not have an event when miterLimit is negative', () => {
    ctx.miterLimit = -10;
  });

  it('should not have an event when miterLimit is not finite', () => {
    ctx.miterLimit = NaN;
  });

  it('should have an event when moveTo is called', () => {
    ctx.moveTo(1, 2);
  });

  it('should not have an event when moveTo is called with non-finite values', () => {
    ctx.moveTo(NaN, 1);
  });

  it('should have an event when putImageData is called', () => {
    ctx.putImageData(imgData, 1, 2);
  });

  it('should not have an event when putImageData is called with non-finite values', () => {
    ctx.putImageData(imgData, 1, NaN);
  });

  it('should have an event when putImageData with a dirty rectangle is called', () => {
    ctx.putImageData(imgData, 1, 2, 3, 4, 5, 6);
  });

  it('should not have an event when putImageData with a dirty rectangle is called with non-finite values', () => {
    ctx.putImageData(imgData, 1, NaN, 3, 4, 5, 6);
  });

  it('should have an event when quadraticCurveTo is called', () => {
    ctx.quadraticCurveTo(1, 2, 3, 4);
  });

  it('should not have an event when quadraticCurveTo is called with non-finite values', () => {
    ctx.quadraticCurveTo(NaN, 2, 3, 4);
  });

  it('should have an event when rect is called', () => {
    ctx.rect(1, 2, 3, 4);
  });

  it('should not have an event when rect is called with non-finite values', () => {
    ctx.rect(NaN, 2, 3, 4);
  });

  it('should have an event when removeHitRegion is called', () => {
    ctx.removeHitRegion('test');
  });

  it('should have an event when resetTransform is called', () => {
    ctx.resetTransform();
  });

  it('should not have an event when restore is called and the stack is empty', () => {
    ctx.restore();
  });

  it('should have an event when save is called', () => {
    ctx.save();
  });

  it('should have an event when restore is called after a save', () => {
    ctx.save();
    ctx.restore();
  });

  it('should have an event when rotate is called', () => {
    ctx.rotate(Math.PI);
  });

  it('should not have an event when rotate is called with a non-finite value', () => {
    ctx.rotate(NaN);
  });

  it('should have an event when scale is called', () => {
    ctx.scale(1, 2);
  });

  it('should not have an event when scale is called with non-finite values', () => {
    ctx.scale(NaN, 2);
  });

  it('should have an event when scrollPathIntoView is called', () => {
    ctx.scrollPathIntoView();
  });

  it('should have an event when setLineDash is called', () => {
    ctx.setLineDash([1, 2, 3]);
  });

  it('should not have an event when setLineDash is called with negative values', () => {
    ctx.setLineDash([-1, -2, -3]);
  });

  it('should not have an event when setLineDash is called with non-finite values', () => {
    ctx.setLineDash([NaN, 1, 2]);
  });

  it('should have an event when setTransform is called', () => {
    ctx.setTransform(1, 2, 3, 4, 5, 6);
  });

  it('should not have an event when setTransform is called with non-finite values', () => {
    ctx.setTransform(NaN, 2, 3, 4, 5, 6);
  });

  it('should have an event when shadowBlur is set', () => {
    ctx.shadowBlur = 1;
  });

  it('should not have an event when shadowBlur is negative', () => {
    ctx.shadowBlur = -1;
  });

  it('should not have an event when shadowBlur is not finite', () => {
    ctx.shadowBlur = NaN;
  });

  it('should have an event when the shadowColor is valid', () => {
    ctx.shadowColor = 'red';
  });

  it('should not have an event when the shadowColor is not valid', () => {
    ctx.shadowColor = 'the color of my soul';
  });

  it('should have an event when the shadowOffsetX is valid', () => {
    ctx.shadowOffsetX = 10;
  });

  it('should not have an event when the shadowOffsetX is not finite', () => {
    ctx.shadowOffsetX = NaN;
  });

  it('should have an event when the shadowOffsetY is valid', () => {
    ctx.shadowOffsetY = 10;
  });

  it('should not have an event when the shadowOffsetY is not finite', () => {
    ctx.shadowOffsetY = NaN;
  });

  it('should have an event when stroke is called', () => {
    ctx.beginPath();
    ctx.arc(100, 101, 10, 0, Math.PI * 2);
    ctx.stroke();
  });

  it('should have an event when stroke is called with a path', () => {
    ctx.stroke(path);
  });

  it('should have an event when strokeRect is called', () => {
    ctx.strokeRect(1, 2, 3, 4);
  });

  it('should not have an event when strokeRect is passed bad values', () => {
    ctx.strokeRect(NaN, 1, 2, 3);
  });

  it('should have an event when the strokeStyle is set', () => {
    ctx.strokeStyle = 'blue';
  });

  it('should not have an event when the strokeStyle is not valid', () => {
    ctx.strokeStyle = 'invalid';
  });

  it('should have an event when strokeText is valid', () => {
    ctx.strokeText('hello world', 0, 0);
  });

  it('should have an event when strokeText has valid maxWidth', () => {
    ctx.strokeText('hello world', 0, 0, 100);
  });

  it('should not have an event when strokeText is not valid', () => {
    ctx.strokeText('hello world', 0, NaN);
  });

  it('should not have an event when strokeText is not valid', () => {
    ctx.strokeText('hello world', 0, 0, NaN);
  });

  it('should have an event when the textAlign is set', () => {
    ctx.textAlign = 'right';
  });

  it('should not have an event when the textAlign is not valid', () => {
    ctx.textAlign = 'invalid';
  });

  it('should have an event when the textBaseline is set', () => {
    ctx.textBaseline = 'hanging';
  });

  it('should not have an event when the textBaseline is not valid', () => {
    ctx.textBaseline = 'invalid';
  });

  it('should have an event when transform is called', () => {
    ctx.transform(1, 2, 3, 4, 5, 6);
  });

  it('should not have an event when transform is called with non-finite values', () => {
    ctx.transform(NaN, 2, 3, 4, 5, 6);
  });

  it('should have an event when translate is called', () => {
    ctx.translate(1, 2);
  });

  it('should not have an event when translate is called with non-finite values', () => {
    ctx.translate(NaN, 1);
  });
});
