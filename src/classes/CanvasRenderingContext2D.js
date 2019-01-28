import DOMMatrix from "./DOMMatrix";
import CanvasPattern from "./CanvasPattern";
import parseColor from "parse-color";
import cssfontparser from "cssfontparser";
import TextMetrics from "./TextMetrics";

function parseCSSColor(value) {
  var result = parseColor(value);
  if (result.rgba && result.rgba[3] !== 1) {
    return "rgba(" + result.rgba.join(", ") + ")";
  }
  if (result.hex) {
    return result.hex;
  }
  return void 0;
}

var testFuncs = [
  "getTransform",
  "getImageData",
  "save",
  "restore",
  "createPattern",
  "createRadialGradient",
  "addHitRegion",
  "arc",
  "arcTo",
  "beginPath",
  "clip",
  "closePath",
  "scale",
  "stroke",
  "clearHitRegions",
  "clearRect",
  "fillRect",
  "strokeRect",
  "rect",
  "resetTransform",
  "translate",
  "moveTo",
  "lineTo",
  "bezierCurveTo",
  "createLinearGradient",
  "ellipse",
  "measureText",
  "rotate",
  "drawImage",
  "drawFocusIfNeeded",
  "isPointInPath",
  "isPointInStroke",
];

var compositeOperations = [
  "source-over",
  "source-in",
  "source-out",
  "source-atop",
  "destination-over",
  "destination-in",
  "destination-out",
  "destination-atop",
  "lighter",
  "copy",
  "xor",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "exclusion",
  "hue",
  "saturation",
  "color",
  "luminosity",
];

export default class CanvasRenderingContext2D {
  _stackIndex = 0;
  _transformStack = [[1, 0, 0, 1, 0, 0]];
  _directionStack = ["inherit"];
  _fillStyleStack = ["#000"];
  _filterStack = ["none"];
  _fontStack = ["10px sans-serif"];
  _globalAlphaStack = [1.0];
  _globalCompositeOperationStack = ["source-over"];
  _imageSmoothingEnabledStack = [true];
  _imageSmoothingQualityStack = ["low"];
  _lineCapStack = ["butt"];
  _lineDashStack = [[]];
  _lineDashOffsetStack = [0];
  _lineJoinStack = ["miter"];
  _lineWidthStack = [1];
  _miterLimitStack = [10];
  _shadowBlurStack = [0];
  _shadowOffsetXStack = [0];
  _shadowOffsetYStack = [0];
  _shadowColorStack = ["rgba(0, 0, 0, 0)"];
  _strokeStyleStack = ["#000"];
  _textAlignStack = ["start"];
  _textBaselineStack = ["alphabetic"];

  constructor(canvas) {
    testFuncs.forEach((key) => {
      this[key] = jest.fn(CanvasRenderingContext2D.prototype[key].bind(this));
    });
    this._canvas = canvas;
  }

  get canvas() {
    return this._canvas;
  }

  get currentTransform() {
    return new DOMMatrix(this._transformStack[this._stackIndex]);
  }

  getTransform() {
    return new DOMMatrix(this._transformStack[this._stackIndex]);
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

  get direction() {
    return this._directionStack[this._stackIndex];
  }

  set direction(value) {
    if (value === "rtl" || value === "ltr" || value === "inherit") {
      this._directionStack[this._stackIndex] = value;
    }
  }

  get fillStyle() {
    return this._fillStyleStack[this._stackIndex];
  }

  set fillStyle(value) {
    if (typeof value === "string") {
      var result = parseCSSColor(value);
      if (result) {
        this._fillStyleStack[this._stackIndex] = result;
      }
    } else if (value instanceof CanvasGradient || value instanceof CanvasPattern) {
      this._fillStyleStack[this._stackIndex] = value;
    }
  }

  get filter() {
    return this._filterStack[this._stackIndex];
  }

  set filter(value) {
    if (value === "") value = "none";
    this._filterStack[this._stackIndex] = typeof value === "string" ? value : "none";
  }

  get font() {
    return this._fontStack[this._stackIndex];
  }

  set font(value) {
    var ex;
    try {
      var result = cssfontparser(value);
      this._fontStack[this._stackIndex] = result.toString();
    } catch(ex) {}
  }

  get globalAlpha() {
    return this._globalAlphaStack[this._stackIndex];
  }

  set globalAlpha(value) {
    if (!Number.isFinite(value)) return;
    if (value < 0) return;
    if (value > 1) return;
    this._globalAlphaStack[this._stackIndex] = value;
  }

  getImageData() {
    return new ImageData(this._canvas.width, this.canvas.height);
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

  measureText(text) {
    if (arguments.length < 1) throw new TypeError("VM5906 pen.js:2 Uncaught TypeError: Failed to execute 'measureText' on 'CanvasRenderingContext2D': 1 argument required, but only 0 present.");
    return new TextMetrics(String(text));
  }

  createPattern(image, type) {
    if (arguments.length === 1)
      throw new TypeError("Failed to execute 'createPattern' on 'CanvasRenderingContext2D': 2 arguments required, but only 1 present.");
    if (type === null) type = "repeat";
    if (type === "") type = "repeat";
    if (type === "repeat" || type === "repeat-x" || type === "repeat-y" || type === "no-repeat") {
      if (image instanceof HTMLImageElement) return new CanvasPattern();
      // if (image instanceof SVGImageElement) return new CanvasPattern();
      if (image instanceof HTMLVideoElement) return new CanvasPattern();
      if (image instanceof HTMLCanvasElement) return new CanvasPattern();
      // if (image instanceof ImageBitmap) return new CanvasPattern();
    } else {
      throw new TypeError("Failed to execute 'createPattern' on 'CanvasRenderingContext2D': The provided type ('" + type + "') is not one of 'repeat', 'no-repeat', 'repeat-x', or 'repeat-y'.");
    }
    throw new TypeError("Failed to execute 'createPattern' on 'CanvasRenderingContext2D': The provided value is not of type '(CSSImageValue or HTMLImageElement or SVGImageElement or HTMLVideoElement or HTMLCanvasElement or ImageBitmap or OffscreenCanvas)'");
  }

  createRadialGradient(x0, y0, r0, x1, y1, r1) {
    if (arguments.length < 6) throw new TypeError("Failed to execute 'createRadialGradient' on 'CanvasRenderingContext2D': 6 arguments required, but only " + arguments.length + " present.");
    if (!Number.isFinite(x0)) throw new TypeError("Failed to execute 'createRadialGradient' on 'CanvasRenderingContext2D': The provided double value is non-finite.");
    if (!Number.isFinite(y0)) throw new TypeError("Failed to execute 'createRadialGradient' on 'CanvasRenderingContext2D': The provided double value is non-finite.");
    if (!Number.isFinite(r0)) throw new TypeError("Failed to execute 'createRadialGradient' on 'CanvasRenderingContext2D': The provided double value is non-finite.");
    if (!Number.isFinite(x1)) throw new TypeError("Failed to execute 'createRadialGradient' on 'CanvasRenderingContext2D': The provided double value is non-finite.");
    if (!Number.isFinite(y1)) throw new TypeError("Failed to execute 'createRadialGradient' on 'CanvasRenderingContext2D': The provided double value is non-finite.");
    if (!Number.isFinite(r1)) throw new TypeError("Failed to execute 'createRadialGradient' on 'CanvasRenderingContext2D': The provided double value is non-finite.");
    if (r0 < 0) throw new DOMException("DataError", "Failed to execute 'createRadialGradient' on 'CanvasRenderingContext2D': The r0 provided is less than 0.");
    if (r1 < 0) throw new DOMException("DataError", "Failed to execute 'createRadialGradient' on 'CanvasRenderingContext2D': The r0 provided is less than 1.");
    return new CanvasPattern();
  }

  createLinearGradient(x0, y0, x1, y1) {
    if (arguments.length < 4) throw new TypeError("Failed to execute 'createLinearGradient' on 'CanvasRenderingContext2D': 4 arguments required, but only " + arguments.length + " present.");
    if (!Number.isFinite(x0)) throw new TypeError("Failed to execute 'createLinearGradient' on 'CanvasRenderingContext2D': The provided double value is non-finite.");
    if (!Number.isFinite(y0)) throw new TypeError("Failed to execute 'createLinearGradient' on 'CanvasRenderingContext2D': The provided double value is non-finite.");
    if (!Number.isFinite(x1)) throw new TypeError("Failed to execute 'createLinearGradient' on 'CanvasRenderingContext2D': The provided double value is non-finite.");
    if (!Number.isFinite(y1)) throw new TypeError("Failed to execute 'createLinearGradient' on 'CanvasRenderingContext2D': The provided double value is non-finite.");
    return new CanvasPattern();
  }

  get globalCompositeOperation() {
    return this._globalCompositeOperationStack[this._stackIndex];
  }

  set globalCompositeOperation(value) {
    if (compositeOperations.indexOf(value) !== -1) {
      this._globalCompositeOperationStack[this._stackIndex] = value;
    }
  }

  get imageSmoothingEnabled() {
    return this._imageSmoothingEnabledStack[this._stackIndex];
  }

  set imageSmoothingEnabled(value) {
    this._imageSmoothingEnabledStack[this._stackIndex] = Boolean(value);
  }

  get imageSmoothingQuality() {
    return this._imageSmoothingQualityStack[this._stackIndex];
  }

  set imageSmoothingQuality(value) {
    if (value === "high" || value === "medium" || value === "low") {
      this._imageSmoothingQualityStack[this._stackIndex] = value;
    }
  }

  get lineCap() {
    return this._lineCapStack[this._stackIndex];
  }

  set lineCap(value) {
    if (value === "butt" || value === "round" || value === "square") {
      this._lineCapStack[this._stackIndex] = value;
    }
  }

  get lineDashOffset() {
    return this._lineDashOffsetStack[this._stackIndex];
  }

  set lineDashOffset(value) {
    var result = Number(value);
    if (Number.isFinite(result)) {
      this._lineDashOffsetStack[this._stackIndex] = result;
    }
  }

  getLineDash() {
    return this._lineDashStack[this._stackIndex];
  }

  setLineDash(lineDash) {
    var isSequence = [
      Array,
      Int8Array,
      Uint8Array,
      Int16Array,
      Uint16Array,
      Int32Array,
      Uint32Array,
      Float32Array,
      Float64Array,
    ].reduce((left, right) => left || lineDash instanceof right, false);
    if (!isSequence) throw new TypeError("Failed to execute 'setLineDash' on 'CanvasRenderingContext2D': The provided value cannot be converted to a sequence.")
    var result = [];
    for (var i = 0; i < lineDash.length; i++) {
      var value = Number(lineDash[i]);
      if (Number.isFinite(value) && value >= 0) {
        result.push(value);
      } else {
        return;
      }
    }
    this._lineDashStack[this._stackIndex] = (result.length % 2 === 1) ? result.concat(result) : result;
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
        throw new TypeError("Failed to execute 'setTransform' on 'CanvasRenderingContext2D': parameter " + a + " ('transform') is not an object.");
      }
      return;
    }
    if (arguments.length < 6) throw new TypeError("Failed to execute 'setTransform' on 'CanvasRenderingContext2D': Valid arities are: [0, 1, 6], but " + arguments.length + " arguments provided.")

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

  get lineJoin() {
    return this._lineJoinStack[this._stackIndex];
  }

  set lineJoin(value) {
    if (value === "round" || value === "bevel" || value === "miter") {
      this._lineJoinStack[this._stackIndex] = value;
    }
  }

  get lineWidth() {
    return this._lineWidthStack[this._stackIndex];
  }

  set lineWidth(value) {
    var result = Number(value);
    if (Number.isFinite(result) && result > 0) {
      this._lineWidthStack[this._stackIndex] = result;
    }
  }

  get miterLimit() {
    return this._miterLimitStack[this._stackIndex];
  }

  set miterLimit(value) {
    var result = Number(value);
    if (Number.isFinite(result) && result > 0) {
      this._miterLimitStack[this._stackIndex] = result;
    }
  }

  get shadowBlur() {
    return this._shadowBlurStack[this._stackIndex];
  }

  set shadowBlur(value) {
    var result = Number(value);
    if (Number.isFinite(result) && result > 0) {
      this._shadowBlurStack[this._stackIndex] = result;
    }
  }

  get shadowColor() {
    return this._shadowColorStack[this._stackIndex];
  }

  set shadowColor(value) {
    if (typeof value === "string") {
      var result = parseCSSColor(value);
      if (result) {
        this._shadowColorStack[this._stackIndex] = result;
      }
    }
  }

  get shadowOffsetX() {
    return this._shadowOffsetXStack[this._stackIndex];
  }

  set shadowOffsetX(value) {
    var result = Number(value);
    if (Number.isFinite(result)) {
      this._shadowOffsetXStack[this._stackIndex] = result;
    }
  }

  get shadowOffsetY() {
    return this._shadowOffsetXStack[this._stackIndex];
  }

  set shadowOffsetY(value) {
    var result = Number(value);
    if (Number.isFinite(result)) {
      this._shadowOffsetXStack[this._stackIndex] = result;
    }
  }

  get strokeStyle() {
    return this._strokeStyleStack[this._stackIndex];
  }

  set strokeStyle(value) {
    if (typeof value === "string") {
      var result = parseCSSColor(value);
      if (result) {
        this._strokeStyleStack[this._stackIndex] = result;
      }
    } else if (value instanceof CanvasGradient || value instanceof CanvasPattern) {
      this._strokeStyleStack[this._stackIndex] = value;
    }
  }

  get textAlign() {
    return this._textAlignStack[this._stackIndex];
  }

  set textAlign(value) {
    if (value === "left" || value === "right" || value === "center" || value === "start" || value === "end") {
      this._textAlignStack[this._stackIndex] = value;
    }
  }

  get textBaseline() {
    return this._textBaselineStack[this._stackIndex];
  }

  set textBaseline(value) {
    if (value === "top" || value === "hanging" || value === "middle" || value === "alphabetic" || value === "ideographic" || value === "bottom") {
      this._textBaselineStack[this._stackIndex] = value;
    }
  }

  addHitRegion(options = {}) {
    var { path, fillRule, id, parentID, cursor, control, label, role } = options;
    if (!path && !id) throw new DOMException("ConstraintError", "Failed to execute 'addHitRegion' on 'CanvasRenderingContext2D': Both id and control are null.");
    if (fillRule && fillRule !== "evenodd" && fillRule !== "nonzero") throw new TypeError("Failed to execute 'addHitRegion' on 'CanvasRenderingContext2D': The provided value '" + fillRule + "' is not a valid enum value of type CanvasFillRule.")
  }

  arc(x, y, radius, startAngle, endAngle, anticlockwise = false) {
    if (arguments.length < 5) throw new TypeError("Failed to execute 'arc' on 'CanvasRenderingContext2D': 5 arguments required, but only " + arguments.length + " present.");
    for (var i = 0; i < 5; i++) {
      if (!Number.isFinite(Number(arguments[i]))) return;
    }
    if (Number(radius) < 0) throw new DOMException("IndexSizeError", "Failed to execute 'arc' on 'CanvasRenderingContext2D': The radius provided (" + radius + ") is negative.");
  }

  arcTo(cpx1, cpy1, cpx2, cpy2, radius) {
    if (arguments.length < 5) throw new TypeError("Failed to execute 'arcTo' on 'CanvasRenderingContext2D': 5 arguments required, but only " + arguments.length + " present.");
    var cpx1Result = Number(cpx1);
    var cpy1Result = Number(cpy1);
    var cpx2Result = Number(cpx2);
    var cpy2Result = Number(cpy2);
    if (Number.isFinite(cpx1Result) && Number.isFinite(cpx2Result) && Number.isFinite(cpy1Result) && Number.isFinite(cpy2Result)) {
      var radiusResult = Number(radius);
      if (Number.isFinite(radiusResult) && radiusResult < 0) throw new TypeError("Failed to execute 'arc' on 'CanvasRenderingContext2D': The radius provided (" + radius + ") is negative.");
    }
  }

  beginPath() {}

  clip() {}

  closePath() {}

  scale(x, y) {
    if (arguments.length < 2) throw new TypeError("TypeError: Failed to execute 'scale' on 'CanvasRenderingContext2D': 2 arguments required, but only " + arguments.length + " present.");
    var xResult = Number(x);
    var yResult = Number(y);
    if (Number.isFinite(xResult) && Number.isFinite(yResult)) {
      this._transformStack[this._stackIndex][0] *= xResult;
      this._transformStack[this._stackIndex][1] *= xResult;
      this._transformStack[this._stackIndex][2] *= yResult;
      this._transformStack[this._stackIndex][3] *= yResult;
    }
  }

  stroke(path) {
    if (arguments.length > 0 && !(path instanceof Path2D)) throw new TypeError("Failed to execute 'stroke' on 'CanvasRenderingContext2D': parameter 1 is not of type 'Path2D'.");
  }

  clearHitRegions() { }

  clearRect(x, y, width, height) {
    if (arguments.length < 4) throw new TypeError("Uncaught TypeError: Failed to execute 'clearRect' on 'CanvasRenderingContext2D': 4 arguments required, but only " + arguments.length + " present.")
  }

  ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise = false) {
    if (arguments.length < 7) throw new TypeError("Failed to execute 'ellipse' on 'CanvasRenderingContext2D': 6 arguments required, but only " + arguments.length + " present.");
    for (var i = 0; i < 7; i++) {
      if (!Number.isFinite(Number(arguments[i]))) return;
    }
    if (Number(radiusX) < 0) throw new DOMException("IndexSizeError", "Failed to execute 'ellipse' on 'CanvasRenderingContext2D': The major-axis radius provided (" + radiusX + ") is negative.");
    if (Number(radiusY) < 0) throw new DOMException("IndexSizeError", "Failed to execute 'ellipse' on 'CanvasRenderingContext2D': The minor-axis radius provided (" + radiusY + ") is negative.");
  }

  fillRect(x, y, width, height) {
    if (arguments.length < 4) throw new TypeError("Uncaught TypeError: Failed to execute 'fillRect' on 'CanvasRenderingContext2D': 4 arguments required, but only " + arguments.length + " present.")
  }

  strokeRect(x, y, width, height) {
    if (arguments.length < 4) throw new TypeError("Uncaught TypeError: Failed to execute 'strokeRect' on 'CanvasRenderingContext2D': 4 arguments required, but only " + arguments.length + " present.")
  }

  rect(x, y, width, height) {
    if (arguments.length < 4) throw new TypeError("Uncaught TypeError: Failed to execute 'rect' on 'CanvasRenderingContext2D': 4 arguments required, but only " + arguments.length + " present.")
  }

  resetTransform() {
    this._transformStack[this._stackIndex][0] = 1;
    this._transformStack[this._stackIndex][1] = 0;
    this._transformStack[this._stackIndex][2] = 0;
    this._transformStack[this._stackIndex][3] = 1;
    this._transformStack[this._stackIndex][4] = 0;
    this._transformStack[this._stackIndex][5] = 0;
  }

  translate(x, y) {
    if (arguments.length < 2) throw new TypeError("TypeError: Failed to execute 'translate' on 'CanvasRenderingContext2D': 2 arguments required, but only " + arguments.length + " present.");
    var xResult = Number(x);
    var yResult = Number(y);
    var a = this._transformStack[this._stackIndex][0];
    var b = this._transformStack[this._stackIndex][1];
    var c = this._transformStack[this._stackIndex][2];
    var d = this._transformStack[this._stackIndex][3];
    if (Number.isFinite(xResult) && Number.isFinite(yResult)) {
      this._transformStack[this._stackIndex][4] += a * xResult + c * yResult;
      this._transformStack[this._stackIndex][5] += b * xResult + d * yResult;
    }
  }

  moveTo(x, y) {
    if (arguments.length < 2) throw new TypeError("Uncaught TypeError: Failed to execute 'moveTo' on 'CanvasRenderingContext2D': 2 arguments required, but only " + arguments.length + " present.")
  }

  lineTo(x, y) {
    if (arguments.length < 2) throw new TypeError("Uncaught TypeError: Failed to execute 'lineTo' on 'CanvasRenderingContext2D': 2 arguments required, but only " + arguments.length + " present.")
  }

  bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x, y) {
    if (arguments.length < 6) throw new TypeError("Uncaught TypeError: Failed to execute 'bezierCurveTo' on 'CanvasRenderingContext2D': 6 arguments required, but only " + arguments.length + " present.")
  }

  rotate(angle) {
    if (arguments.length < 1) throw new TypeError("VM6715 pen.js:2 Uncaught TypeError: Failed to execute 'rotate' on 'CanvasRenderingContext2D': 1 argument required, but only 0 present.");
    angle = Number(angle);
    if (!Number.isFinite(angle)) return;
    var a = this._transformStack[this._stackIndex][0];
    var b = this._transformStack[this._stackIndex][1];
    var c = this._transformStack[this._stackIndex][2];
    var d = this._transformStack[this._stackIndex][3];
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    this._transformStack[this._stackIndex][0] = a * cos + c * sin;
    this._transformStack[this._stackIndex][1] = b * cos + d * sin;
    this._transformStack[this._stackIndex][2] = c * cos - a * sin;
    this._transformStack[this._stackIndex][3] = d * cos - b * sin;
  }

  drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
    if (arguments.length < 3) throw new TypeError("Failed to execute 'drawImage' on 'CanvasRenderingContext2D': 3 arguments required, but only " + arguments.length + " present.");
    if (arguments.length === 4 || (arguments.length > 5 && arguments.length < 9)) throw new TypeError("Failed to execute 'drawImage' on 'CanvasRenderingContext2D': Valid arities are: [3, 5, 9], but 4 arguments provided.");
    if (img instanceof HTMLImageElement || img instanceof HTMLCanvasElement || img instanceof HTMLVideoElement) {
      return;
    }
    throw new TypeError("Failed to execute 'drawImage' on 'CanvasRenderingContext2D': The provided value is not of type '(CSSImageValue or HTMLImageElement or SVGImageElement or HTMLVideoElement or HTMLCanvasElement or ImageBitmap or OffscreenCanvas)'");
  }

  drawFocusIfNeeded(path, element) {
    if (arguments.length === 0) throw new TypeError("Failed to execute 'drawFocusIfNeeded' on 'CanvasRenderingContext2D': 1 argument required, but only 0 present.");
    if (arguments.length === 2 && !(path instanceof Path2D)) throw new TypeError("Failed to execute 'drawFocusIfNeeded' on 'CanvasRenderingContext2D': parameter 1 is not of type 'Path2D'.");
    if (arguments.length === 1) {
      element = path;
    }
    if (!(element instanceof Element)) throw new TypeError(" Failed to execute 'drawFocusIfNeeded' on 'CanvasRenderingContext2D': parameter " + arguments.length + " is not of type 'Element'.");
  }

  isPointInPath(path, x, y, fillRule = "nonzero") {
    if (arguments.length < 2) throw new TypeError("Failed to execute 'isPointInPath' on 'CanvasRenderingContext2D': 2 arguments required, but only " + arguments.length + " present.");
    if (arguments.length === 3 && !(path instanceof Path2D)) fillRule = y;
    if (fillRule !== "nonzero" && fillRule !== "evenodd") throw new TypeError("Failed to execute 'isPointInPath' on 'CanvasRenderingContext2D': The provided value '" + fillRule + "' is not a valid enum value of type CanvasFillRule.");
    return false; // return false in a mocking environment, unless I can verify a point is actually within the path
  }

  isPointInStroke(path, x, y, fillRule = "nonzero") {
    if (arguments.length < 2) throw new TypeError("Failed to execute 'isPointInStroke' on 'CanvasRenderingContext2D': 2 arguments required, but only " + arguments.length + " present.");
    return false; // return false in a mocking environment, unless I can verify a point is actually within the path
  }
}
