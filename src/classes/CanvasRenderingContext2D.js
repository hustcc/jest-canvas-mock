import DOMMatrix from './DOMMatrix';
import CanvasPattern from './CanvasPattern';
import parseColor from 'parse-color';
import cssfontparser from 'cssfontparser';
import TextMetrics from './TextMetrics';

function parseCSSColor(value) {
  const result = parseColor(value);

  if (result.rgba && result.rgba[3] !== 1) {
    return 'rgba(' + result.rgba.join(', ') + ')';
  }

  if (result.hex) {
    return result.hex;
  }

  return void 0;
}

const testFuncs = ['getTransform', 'getImageData', 'save', 'restore', 'createPattern', 'createRadialGradient', 'addHitRegion', 'arc', 'arcTo', 'beginPath', 'clip', 'closePath', 'scale', 'stroke', 'clearHitRegions', 'clearRect', 'fillRect', 'strokeRect', 'rect', 'resetTransform', 'translate', 'moveTo', 'lineTo', 'bezierCurveTo', 'createLinearGradient', 'ellipse', 'measureText', 'rotate', 'drawImage', 'drawFocusIfNeeded', 'isPointInPath', 'isPointInStroke', 'putImageData', 'strokeText', 'fillText', 'quadraticCurveTo', 'removeHitRegion', 'fill', 'transform', 'scrollPathIntoView'];
const compositeOperations = ['source-over', 'source-in', 'source-out', 'source-atop', 'destination-over', 'destination-in', 'destination-out', 'destination-atop', 'lighter', 'copy', 'xor', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity', 'fillText', 'strokeText'];

export default class CanvasRenderingContext2D {
  _directionStack = ['inherit'];
  _fillStyleStack = ['#000'];
  _filterStack = ['none'];
  _fontStack = ['10px sans-serif'];
  _globalAlphaStack = [1.0];
  _globalCompositeOperationStack = ['source-over'];
  _imageSmoothingEnabledStack = [true];
  _imageSmoothingQualityStack = ['low'];
  _lineCapStack = ['butt'];
  _lineDashOffsetStack = [0];
  _lineDashStack = [[]];
  _lineJoinStack = ['miter'];
  _lineWidthStack = [1];
  _miterLimitStack = [10];
  _shadowBlurStack = [0];
  _shadowColorStack = ['rgba(0, 0, 0, 0)'];
  _shadowOffsetXStack = [0];
  _shadowOffsetYStack = [0];
  _stackIndex = 0;
  _strokeStyleStack = ['#000'];
  _textAlignStack = ['start'];
  _textBaselineStack = ['alphabetic'];
  _transformStack = [[1, 0, 0, 1, 0, 0]];

  constructor(canvas) {
    testFuncs.forEach(key => {
      this[key] = jest.fn(CanvasRenderingContext2D.prototype[key].bind(this));
    });
    this._canvas = canvas;
  }

  addHitRegion(options = {}) {
    const {
      path,
      fillRule,
      id,
      parentID,
      cursor,
      control,
      label,
      role
    } = options;
    if (!path && !id) throw new DOMException('ConstraintError', 'Failed to execute \'addHitRegion\' on \'' + this.constructor.name + '\': Both id and control are null.');
    if (fillRule && fillRule !== 'evenodd' && fillRule !== 'nonzero') throw new TypeError('Failed to execute \'addHitRegion\' on \'' + this.constructor.name + '\': The provided value \'' + fillRule + '\' is not a valid enum value of type CanvasFillRule.');
  }

  arc(x, y, radius, startAngle, endAngle, anticlockwise = false) {
    if (arguments.length < 5) throw new TypeError('Failed to execute \'arc\' on \'' + this.constructor.name + '\': 5 arguments required, but only ' + arguments.length + ' present.');

    for (let i = 0; i < 5; i++) {
      if (!Number.isFinite(Number(arguments[i]))) return;
    }

    if (Number(radius) < 0) throw new DOMException('IndexSizeError', 'Failed to execute \'arc\' on \'' + this.constructor.name + '\': The radius provided (' + radius + ') is negative.');
  }

  arcTo(cpx1, cpy1, cpx2, cpy2, radius) {
    if (arguments.length < 5) throw new TypeError('Failed to execute \'arcTo\' on \'' + this.constructor.name + '\': 5 arguments required, but only ' + arguments.length + ' present.');
    const cpx1Result = Number(cpx1);
    const cpy1Result = Number(cpy1);
    const cpx2Result = Number(cpx2);
    const cpy2Result = Number(cpy2);

    if (Number.isFinite(cpx1Result) && Number.isFinite(cpx2Result) && Number.isFinite(cpy1Result) && Number.isFinite(cpy2Result)) {
      const radiusResult = Number(radius);
      if (Number.isFinite(radiusResult) && radiusResult < 0) throw new TypeError('Failed to execute \'arc\' on \'' + this.constructor.name + '\': The radius provided (' + radius + ') is negative.');
    }
  }

  beginPath() {}

  bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x, y) {
    if (arguments.length < 6) throw new TypeError('Uncaught TypeError: Failed to execute \'bezierCurveTo\' on \'' + this.constructor.name + '\': 6 arguments required, but only ' + arguments.length + ' present.');
  }

  get canvas() {
    return this._canvas;
  }

  clearHitRegions() {}

  clearRect(x, y, width, height) {
    if (arguments.length < 4) throw new TypeError('Uncaught TypeError: Failed to execute \'clearRect\' on \'' + this.constructor.name + '\': 4 arguments required, but only ' + arguments.length + ' present.');
  }

  clip() {}

  closePath() {}

  createLinearGradient(x0, y0, x1, y1) {
    if (arguments.length < 4) throw new TypeError('Failed to execute \'createLinearGradient\' on \'' + this.constructor.name + '\': 4 arguments required, but only ' + arguments.length + ' present.');
    if (!Number.isFinite(x0)) throw new TypeError('Failed to execute \'createLinearGradient\' on \'' + this.constructor.name + '\': The provided double value is non-finite.');
    if (!Number.isFinite(y0)) throw new TypeError('Failed to execute \'createLinearGradient\' on \'' + this.constructor.name + '\': The provided double value is non-finite.');
    if (!Number.isFinite(x1)) throw new TypeError('Failed to execute \'createLinearGradient\' on \'' + this.constructor.name + '\': The provided double value is non-finite.');
    if (!Number.isFinite(y1)) throw new TypeError('Failed to execute \'createLinearGradient\' on \'' + this.constructor.name + '\': The provided double value is non-finite.');
    return new CanvasGradient();
  }

  createPattern(image, type) {
    if (arguments.length === 1) throw new TypeError('Failed to execute \'createPattern\' on \'' + this.constructor.name + '\': 2 arguments required, but only 1 present.');
    if (type === null) type = 'repeat';
    if (type === '') type = 'repeat';

    if (type === 'repeat' || type === 'repeat-x' || type === 'repeat-y' || type === 'no-repeat') {
      if (image instanceof HTMLImageElement) return new CanvasPattern(); // if (image instanceof SVGImageElement) return new CanvasPattern();

      if (image instanceof HTMLVideoElement) return new CanvasPattern();
      if (image instanceof HTMLCanvasElement) return new CanvasPattern(); // if (image instanceof ImageBitmap) return new CanvasPattern();
    } else {
      throw new TypeError('Failed to execute \'createPattern\' on \'' + this.constructor.name + '\': The provided type (\'' + type + '\') is not one of \'repeat\', \'no-repeat\', \'repeat-x\', or \'repeat-y\'.');
    }

    throw new TypeError('Failed to execute \'createPattern\' on \'' + this.constructor.name + '\': The provided value is not of type \'(CSSImageValue or HTMLImageElement or SVGImageElement or HTMLVideoElement or HTMLCanvasElement or ImageBitmap or OffscreenCanvas)\'');
  }

  createRadialGradient(x0, y0, r0, x1, y1, r1) {
    if (arguments.length < 6) throw new TypeError('Failed to execute \'createRadialGradient\' on \'' + this.constructor.name + '\': 6 arguments required, but only ' + arguments.length + ' present.');
    if (!Number.isFinite(x0)) throw new TypeError('Failed to execute \'createRadialGradient\' on \'' + this.constructor.name + '\': The provided double value is non-finite.');
    if (!Number.isFinite(y0)) throw new TypeError('Failed to execute \'createRadialGradient\' on \'' + this.constructor.name + '\': The provided double value is non-finite.');
    if (!Number.isFinite(r0)) throw new TypeError('Failed to execute \'createRadialGradient\' on \'' + this.constructor.name + '\': The provided double value is non-finite.');
    if (!Number.isFinite(x1)) throw new TypeError('Failed to execute \'createRadialGradient\' on \'' + this.constructor.name + '\': The provided double value is non-finite.');
    if (!Number.isFinite(y1)) throw new TypeError('Failed to execute \'createRadialGradient\' on \'' + this.constructor.name + '\': The provided double value is non-finite.');
    if (!Number.isFinite(r1)) throw new TypeError('Failed to execute \'createRadialGradient\' on \'' + this.constructor.name + '\': The provided double value is non-finite.');
    if (r0 < 0) throw new DOMException('DataError', 'Failed to execute \'createRadialGradient\' on \'' + this.constructor.name + '\': The r0 provided is less than 0.');
    if (r1 < 0) throw new DOMException('DataError', 'Failed to execute \'createRadialGradient\' on \'' + this.constructor.name + '\': The r0 provided is less than 1.');
    return new CanvasGradient();
  }

  set currentTransform(value) {
    if (value instanceof DOMMatrix) {
      this._transformStack[this._stackIndex][0] = value.a;
      this._transformStack[this._stackIndex][1] = value.b;
      this._transformStack[this._stackIndex][2] = value.c;
      this._transformStack[this._stackIndex][3] = value.d;
      this._transformStack[this._stackIndex][4] = value.e;
      this._transformStack[this._stackIndex][5] = value.f;
    }
  }

  get currentTransform() {
    return new DOMMatrix(this._transformStack[this._stackIndex]);
  }

  set direction(value) {
    if (value === 'rtl' || value === 'ltr' || value === 'inherit') {
      this._directionStack[this._stackIndex] = value;
    }
  }

  get direction() {
    return this._directionStack[this._stackIndex];
  }

  drawFocusIfNeeded(path, element) {
    if (arguments.length === 0) throw new TypeError('Failed to execute \'drawFocusIfNeeded\' on \'' + this.constructor.name + '\': 1 argument required, but only 0 present.');
    if (arguments.length === 2 && !(path instanceof Path2D)) throw new TypeError('Failed to execute \'drawFocusIfNeeded\' on \'' + this.constructor.name + '\': parameter 1 is not of type \'Path2D\'.');

    if (arguments.length === 1) {
      element = path;
    }

    if (!(element instanceof Element)) throw new TypeError(' Failed to execute \'drawFocusIfNeeded\' on \'' + this.constructor.name + '\': parameter ' + arguments.length + ' is not of type \'Element\'.');
  }

  drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
    if (arguments.length < 3) throw new TypeError('Failed to execute \'drawImage\' on \'' + this.constructor.name + '\': 3 arguments required, but only ' + arguments.length + ' present.');
    if (arguments.length === 4 || arguments.length > 5 && arguments.length < 9) throw new TypeError('Failed to execute \'drawImage\' on \'' + this.constructor.name + '\': Valid arities are: [3, 5, 9], but 4 arguments provided.');

    if (img instanceof HTMLImageElement || img instanceof HTMLCanvasElement || img instanceof HTMLVideoElement) {
      return;
    }

    throw new TypeError('Failed to execute \'drawImage\' on \'' + this.constructor.name + '\': The provided value is not of type \'(CSSImageValue or HTMLImageElement or SVGImageElement or HTMLVideoElement or HTMLCanvasElement or ImageBitmap or OffscreenCanvas)\'');
  }

  ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise = false) {
    if (arguments.length < 7) throw new TypeError('Failed to execute \'ellipse\' on \'' + this.constructor.name + '\': 6 arguments required, but only ' + arguments.length + ' present.');

    for (let i = 0; i < 7; i++) {
      if (!Number.isFinite(Number(arguments[i]))) return;
    }

    if (Number(radiusX) < 0) throw new DOMException('IndexSizeError', 'Failed to execute \'ellipse\' on \'' + this.constructor.name + '\': The major-axis radius provided (' + radiusX + ') is negative.');
    if (Number(radiusY) < 0) throw new DOMException('IndexSizeError', 'Failed to execute \'ellipse\' on \'' + this.constructor.name + '\': The minor-axis radius provided (' + radiusY + ') is negative.');
  }

  fill(path, fillRule) {
    if (arguments.length === 0) return;

    if (path instanceof Path2D) {
      fillRule = String(fillRule);
      if (fillRule !== 'nonzero' && fillRule !== 'evenodd') throw new TypeError('Failed to execute \'fill\' on \'' + this.constructor.name + '\': The provided value \'' + fillRule + '\' is not a valid enum value of type CanvasFillRule.');
    } else {
      path = String(path);
      if (path !== 'nonzero' && path !== 'evenodd') throw new TypeError('Failed to execute \'fill\' on \'' + this.constructor.name + '\': The provided value \'' + path + '\' is not a valid enum value of type CanvasFillRule.');
    }
  }

  fillRect(x, y, width, height) {
    if (arguments.length < 4) throw new TypeError('Uncaught TypeError: Failed to execute \'fillRect\' on \'' + this.constructor.name + '\': 4 arguments required, but only ' + arguments.length + ' present.');
  }

  set fillStyle(value) {
    if (typeof value === 'string') {
      const result = parseCSSColor(value);

      if (result) {
        this._fillStyleStack[this._stackIndex] = result;
      }
    } else if (value instanceof CanvasGradient || value instanceof CanvasPattern) {
      this._fillStyleStack[this._stackIndex] = value;
    }
  }

  get fillStyle() {
    return this._fillStyleStack[this._stackIndex];
  }

  fillText(text, x, y, maxWidth) {
    if (arguments.length < 3) throw new TypeError('Failed to execute \'fillText\' on \'' + this.constructor.name + '\': 3 arguments required, but only ' + arguments.length + ' present.');
  }

  set filter(value) {
    if (value === '') value = 'none';
    this._filterStack[this._stackIndex] = typeof value === 'string' ? value : 'none';
  }

  get filter() {
    return this._filterStack[this._stackIndex];
  }

  set font(value) {
    let ex;

    try {
      const result = cssfontparser(value);
      this._fontStack[this._stackIndex] = result.toString();
    } catch (ex) {}
  }

  get font() {
    return this._fontStack[this._stackIndex];
  }

  getImageData() {
    return new ImageData(this._canvas.width, this.canvas.height);
  }

  getLineDash() {
    return this._lineDashStack[this._stackIndex];
  }

  getTransform() {
    return new DOMMatrix(this._transformStack[this._stackIndex]);
  }

  set globalAlpha(value) {
    if (!Number.isFinite(value)) return;
    if (value < 0) return;
    if (value > 1) return;
    this._globalAlphaStack[this._stackIndex] = value;
  }

  get globalAlpha() {
    return this._globalAlphaStack[this._stackIndex];
  }

  set globalCompositeOperation(value) {
    if (compositeOperations.indexOf(value) !== -1) {
      this._globalCompositeOperationStack[this._stackIndex] = value;
    }
  }

  get globalCompositeOperation() {
    return this._globalCompositeOperationStack[this._stackIndex];
  }

  set imageSmoothingEnabled(value) {
    this._imageSmoothingEnabledStack[this._stackIndex] = Boolean(value);
  }

  get imageSmoothingEnabled() {
    return this._imageSmoothingEnabledStack[this._stackIndex];
  }

  set imageSmoothingQuality(value) {
    if (value === 'high' || value === 'medium' || value === 'low') {
      this._imageSmoothingQualityStack[this._stackIndex] = value;
    }
  }

  get imageSmoothingQuality() {
    return this._imageSmoothingQualityStack[this._stackIndex];
  }

  isPointInPath(path, x, y, fillRule = 'nonzero') {
    if (arguments.length < 2) throw new TypeError('Failed to execute \'isPointInPath\' on \'' + this.constructor.name + '\': 2 arguments required, but only ' + arguments.length + ' present.');
    if (arguments.length === 3 && !(path instanceof Path2D)) fillRule = y;
    if (fillRule !== 'nonzero' && fillRule !== 'evenodd') throw new TypeError('Failed to execute \'isPointInPath\' on \'' + this.constructor.name + '\': The provided value \'' + fillRule + '\' is not a valid enum value of type CanvasFillRule.');
    return false; // return false in a mocking environment, unless I can verify a point is actually within the path
  }

  isPointInStroke(path, x, y, fillRule = 'nonzero') {
    if (arguments.length < 2) throw new TypeError('Failed to execute \'isPointInStroke\' on \'' + this.constructor.name + '\': 2 arguments required, but only ' + arguments.length + ' present.');
    return false; // return false in a mocking environment, unless I can verify a point is actually within the path
  }

  set lineCap(value) {
    if (value === 'butt' || value === 'round' || value === 'square') {
      this._lineCapStack[this._stackIndex] = value;
    }
  }

  get lineCap() {
    return this._lineCapStack[this._stackIndex];
  }

  set lineDashOffset(value) {
    const result = Number(value);

    if (Number.isFinite(result)) {
      this._lineDashOffsetStack[this._stackIndex] = result;
    }
  }

  get lineDashOffset() {
    return this._lineDashOffsetStack[this._stackIndex];
  }

  set lineJoin(value) {
    if (value === 'round' || value === 'bevel' || value === 'miter') {
      this._lineJoinStack[this._stackIndex] = value;
    }
  }

  get lineJoin() {
    return this._lineJoinStack[this._stackIndex];
  }

  lineTo(x, y) {
    if (arguments.length < 2) throw new TypeError('Uncaught TypeError: Failed to execute \'lineTo\' on \'' + this.constructor.name + '\': 2 arguments required, but only ' + arguments.length + ' present.');
  }

  set lineWidth(value) {
    const result = Number(value);

    if (Number.isFinite(result) && result > 0) {
      this._lineWidthStack[this._stackIndex] = result;
    }
  }

  get lineWidth() {
    return this._lineWidthStack[this._stackIndex];
  }

  measureText(text) {
    if (arguments.length < 1) throw new TypeError('VM5906 pen.js:2 Uncaught TypeError: Failed to execute \'measureText\' on \'' + this.constructor.name + '\': 1 argument required, but only 0 present.');
    return new TextMetrics(String(text));
  }

  set miterLimit(value) {
    const result = Number(value);

    if (Number.isFinite(result) && result > 0) {
      this._miterLimitStack[this._stackIndex] = result;
    }
  }

  get miterLimit() {
    return this._miterLimitStack[this._stackIndex];
  }

  moveTo(x, y) {
    if (arguments.length < 2) throw new TypeError('Uncaught TypeError: Failed to execute \'moveTo\' on \'' + this.constructor.name + '\': 2 arguments required, but only ' + arguments.length + ' present.');
  }

  putImageData(data, x, y, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
    if (arguments.length < 3) throw new TypeError('Failed to execute \'putImageData\' on \'' + this.constructor.name + '\': 3 arguments required, but only ' + arguments.length + ' present.');
    if (arguments.length > 3 && arguments.length < 7) throw new TypeError('Failed to execute \'putImageData\' on \'' + this.constructor.name + '\': Valid arities are: [3, 7], but ' + arguments.length + ' arguments provided.');
    if (!(data instanceof ImageData)) throw new TypeError('Failed to execute \'putImageData\' on \'' + this.constructor.name + '\': parameter 1 is not of type \'ImageData\'.');
  }

  quadraticCurveTo(cpx, cpy, x, y) {
    if (arguments.length < 4) throw new TypeError('Failed to execute \'quadraticCurveTo\' on \'' + this.constructor.name + '\': 4 arguments required, but only ' + arguments.length + ' present.');
  }

  rect(x, y, width, height) {
    if (arguments.length < 4) throw new TypeError('Uncaught TypeError: Failed to execute \'rect\' on \'' + this.constructor.name + '\': 4 arguments required, but only ' + arguments.length + ' present.');
  }

  removeHitRegion(id) {
    if (arguments.length < 1) throw new TypeError('Failed to execute \'removeHitRegion\' on \'' + this.constructor.name + '\': 1 argument required, but only ' + arguments.length + ' present.');
  }

  resetTransform() {
    this._transformStack[this._stackIndex][0] = 1;
    this._transformStack[this._stackIndex][1] = 0;
    this._transformStack[this._stackIndex][2] = 0;
    this._transformStack[this._stackIndex][3] = 1;
    this._transformStack[this._stackIndex][4] = 0;
    this._transformStack[this._stackIndex][5] = 0;
  }

  restore() {
    this._transformStack.pop();
    this._directionStack.pop();
    this._fillStyleStack.pop();
    this._filterStack.pop();
    this._fontStack.pop();
    this._globalAlphaStack.pop();
    this._globalCompositeOperationStack.pop();
    this._imageSmoothingEnabledStack.pop();
    this._imageSmoothingQualityStack.pop();
    this._lineCapStack.pop();
    this._lineDashStack.pop();
    this._lineDashOffsetStack.pop();
    this._lineJoinStack.pop();
    this._lineWidthStack.pop();
    this._miterLimitStack.pop();
    this._shadowBlurStack.pop();
    this._shadowColorStack.pop();
    this._shadowOffsetXStack.pop();
    this._shadowOffsetYStack.pop();
    this._strokeStyleStack.pop();
    this._textAlignStack.pop();
    this._textBaselineStack.pop();
    this._stackIndex -= 1;
  }

  rotate(angle) {
    if (arguments.length < 1) throw new TypeError('VM6715 pen.js:2 Uncaught TypeError: Failed to execute \'rotate\' on \'' + this.constructor.name + '\': 1 argument required, but only 0 present.');
    angle = Number(angle);
    if (!Number.isFinite(angle)) return;
    const a = this._transformStack[this._stackIndex][0];
    const b = this._transformStack[this._stackIndex][1];
    const c = this._transformStack[this._stackIndex][2];
    const d = this._transformStack[this._stackIndex][3];
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    this._transformStack[this._stackIndex][0] = a * cos + c * sin;
    this._transformStack[this._stackIndex][1] = b * cos + d * sin;
    this._transformStack[this._stackIndex][2] = c * cos - a * sin;
    this._transformStack[this._stackIndex][3] = d * cos - b * sin;
  }

  save() {
    this._transformStack.push(this._transformStack[this._stackIndex]);
    this._directionStack.push(this._directionStack[this._stackIndex]);
    this._fillStyleStack.push(this._fillStyleStack[this._stackIndex]);
    this._filterStack.push(this._filterStack[this._stackIndex]);
    this._fontStack.push(this._fontStack[this._stackIndex]);
    this._globalAlphaStack.push(this._globalAlphaStack[this._stackIndex]);
    this._globalCompositeOperationStack.push(this._globalCompositeOperationStack[this._stackIndex]);
    this._imageSmoothingEnabledStack.push(this._imageSmoothingEnabledStack[this._stackIndex]);
    this._imageSmoothingQualityStack.push(this._imageSmoothingQualityStack[this._stackIndex]);
    this._lineCapStack.push(this._lineCapStack[this._stackIndex]);
    this._lineDashStack.push(this._lineDashStack[this._stackIndex]);
    this._lineDashOffsetStack.push(this._lineDashOffsetStack[this._stackIndex]);
    this._lineJoinStack.push(this._lineJoinStack[this._stackIndex]);
    this._lineWidthStack.push(this._lineWidthStack[this.stackIndex]);
    this._miterLimitStack.push(this._miterLimitStack[this._stackIndex]);
    this._shadowBlurStack.push(this._shadowBlurStack[this._stackIndex]);
    this._shadowColorStack.push(this._shadowColorStack[this._stackIndex]);
    this._shadowOffsetXStack.push(this._shadowOffsetXStack[this._stackIndex]);
    this._shadowOffsetYStack.push(this._shadowOffsetYStack[this._stackIndex]);
    this._strokeStyleStack.push(this._strokeStyleStack[this._stackIndex]);
    this._textAlignStack.push(this._textAlignStack[this._stackIndex]);
    this._textBaselineStack.push(this._textBaselineStack[this._stackIndex]);
    this._stackIndex += 1;
  }

  scale(x, y) {
    if (arguments.length < 2) throw new TypeError('TypeError: Failed to execute \'scale\' on \'' + this.constructor.name + '\': 2 arguments required, but only ' + arguments.length + ' present.');
    const xResult = Number(x);
    const yResult = Number(y);

    if (Number.isFinite(xResult) && Number.isFinite(yResult)) {
      this._transformStack[this._stackIndex][0] *= xResult;
      this._transformStack[this._stackIndex][1] *= xResult;
      this._transformStack[this._stackIndex][2] *= yResult;
      this._transformStack[this._stackIndex][3] *= yResult;
    }
  }

  scrollPathIntoView() {}

  setLineDash(lineDash) {
    const isSequence = [Array, Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array].reduce((left, right) => left || lineDash instanceof right, false);
    if (!isSequence) throw new TypeError('Failed to execute \'setLineDash\' on \'' + this.constructor.name + '\': The provided value cannot be converted to a sequence.');
    const result = [];

    for (let i = 0; i < lineDash.length; i++) {
      const value = Number(lineDash[i]);

      if (Number.isFinite(value) && value >= 0) {
        result.push(value);
      } else {
        return;
      }
    }

    this._lineDashStack[this._stackIndex] = result.length % 2 === 1 ? result.concat(result) : result;
  }

  setTransform(a, b, c, d, e, f) {
    if (arguments.length === 0) {
      this._transformStack[this._stackIndex][0] = 1;
      this._transformStack[this._stackIndex][1] = 0;
      this._transformStack[this._stackIndex][2] = 0;
      this._transformStack[this._stackIndex][3] = 1;
      this._transformStack[this._stackIndex][4] = 0;
      this._transformStack[this._stackIndex][5] = 0;
      return;
    }

    if (arguments.length === 1) {
      if (a instanceof DOMMatrix) {
        this.currentTransform = a;
      } else {
        throw new TypeError('Failed to execute \'setTransform\' on \'' + this.constructor.name + '\': parameter ' + a + ' (\'transform\') is not an object.');
      }

      return;
    }

    if (arguments.length < 6) throw new TypeError('Failed to execute \'setTransform\' on \'' + this.constructor.name + '\': Valid arities are: [0, 1, 6], but ' + arguments.length + ' arguments provided.');
    a = Number(a);
    b = Number(b);
    c = Number(c);
    d = Number(d);
    e = Number(e);
    f = Number(f);
    if (!Number.isFinite(a)) return;
    if (!Number.isFinite(b)) return;
    if (!Number.isFinite(c)) return;
    if (!Number.isFinite(d)) return;
    if (!Number.isFinite(e)) return;
    if (!Number.isFinite(f)) return;
    this._transformStack[this._stackIndex][0] = a;
    this._transformStack[this._stackIndex][1] = b;
    this._transformStack[this._stackIndex][2] = c;
    this._transformStack[this._stackIndex][3] = d;
    this._transformStack[this._stackIndex][4] = e;
    this._transformStack[this._stackIndex][5] = f;
  }

  set shadowBlur(value) {
    const result = Number(value);

    if (Number.isFinite(result) && result > 0) {
      this._shadowBlurStack[this._stackIndex] = result;
    }
  }

  get shadowBlur() {
    return this._shadowBlurStack[this._stackIndex];
  }

  set shadowColor(value) {
    if (typeof value === 'string') {
      const result = parseCSSColor(value);

      if (result) {
        this._shadowColorStack[this._stackIndex] = result;
      }
    }
  }

  get shadowColor() {
    return this._shadowColorStack[this._stackIndex];
  }

  set shadowOffsetX(value) {
    const result = Number(value);

    if (Number.isFinite(result)) {
      this._shadowOffsetXStack[this._stackIndex] = result;
    }
  }

  get shadowOffsetX() {
    return this._shadowOffsetXStack[this._stackIndex];
  }

  set shadowOffsetY(value) {
    const result = Number(value);

    if (Number.isFinite(result)) {
      this._shadowOffsetXStack[this._stackIndex] = result;
    }
  }

  get shadowOffsetY() {
    return this._shadowOffsetXStack[this._stackIndex];
  }

  stroke(path) {
    if (arguments.length > 0 && !(path instanceof Path2D)) throw new TypeError('Failed to execute \'stroke\' on \'' + this.constructor.name + '\': parameter 1 is not of type \'Path2D\'.');
  }

  strokeRect(x, y, width, height) {
    if (arguments.length < 4) throw new TypeError('Uncaught TypeError: Failed to execute \'strokeRect\' on \'' + this.constructor.name + '\': 4 arguments required, but only ' + arguments.length + ' present.');
  }

  set strokeStyle(value) {
    if (typeof value === 'string') {
      const result = parseCSSColor(value);

      if (result) {
        this._strokeStyleStack[this._stackIndex] = result;
      }
    } else if (value instanceof CanvasGradient || value instanceof CanvasPattern) {
      this._strokeStyleStack[this._stackIndex] = value;
    }
  }

  get strokeStyle() {
    return this._strokeStyleStack[this._stackIndex];
  }

  strokeText(text, x, y, maxWidth) {
    if (arguments.length < 3) throw new TypeError('Failed to execute \'strokeText\' on \'' + this.constructor.name + '\': 3 arguments required, but only ' + arguments.length + ' present.');
  }

  set textAlign(value) {
    if (value === 'left' || value === 'right' || value === 'center' || value === 'start' || value === 'end') {
      this._textAlignStack[this._stackIndex] = value;
    }
  }

  get textAlign() {
    return this._textAlignStack[this._stackIndex];
  }

  set textBaseline(value) {
    if (value === 'top' || value === 'hanging' || value === 'middle' || value === 'alphabetic' || value === 'ideographic' || value === 'bottom') {
      this._textBaselineStack[this._stackIndex] = value;
    }
  }

  get textBaseline() {
    return this._textBaselineStack[this._stackIndex];
  }

  transform(a, b, c, d, e, f) {
    if (arguments.length < 6) throw new TypeError('Failed to execute \'transform\' on \'' + this.constructor.name + '\': 6 arguments required, but only ' + arguments.length + ' present.');

    for (let i = 0; i < 6; i++) if (!Number.isFinite(Number(arguments[i]))) return;

    a = Number(a);
    b = Number(b);
    c = Number(c);
    d = Number(d);
    e = Number(e);
    f = Number(f);
    const sa = this._transformStack[this._stackIndex][0];
    const sb = this._transformStack[this._stackIndex][1];
    const sc = this._transformStack[this._stackIndex][2];
    const sd = this._transformStack[this._stackIndex][3];
    const se = this._transformStack[this._stackIndex][4];
    const sf = this._transformStack[this._stackIndex][5];
    this._transformStack[this._stackIndex][0] = sa * a + sc * b;
    this._transformStack[this._stackIndex][1] = sb * a + sd * b;
    this._transformStack[this._stackIndex][2] = sa * c + sc * d;
    this._transformStack[this._stackIndex][3] = sb * c + sd * d;
    this._transformStack[this._stackIndex][4] = sa * e + sc * f + se;
    this._transformStack[this._stackIndex][5] = sb * e + sd * f + sf;
  }

  translate(x, y) {
    if (arguments.length < 2) throw new TypeError('TypeError: Failed to execute \'translate\' on \'' + this.constructor.name + '\': 2 arguments required, but only ' + arguments.length + ' present.');
    const xResult = Number(x);
    const yResult = Number(y);
    const a = this._transformStack[this._stackIndex][0];
    const b = this._transformStack[this._stackIndex][1];
    const c = this._transformStack[this._stackIndex][2];
    const d = this._transformStack[this._stackIndex][3];

    if (Number.isFinite(xResult) && Number.isFinite(yResult)) {
      this._transformStack[this._stackIndex][4] += a * xResult + c * yResult;
      this._transformStack[this._stackIndex][5] += b * xResult + d * yResult;
    }
  }

}
