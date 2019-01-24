import DOMMatrix from "./DOMMatrix";
import CanvasPattern from "./CanvasPattern";
import parseColor from "parse-color";
import cssfontparser from "cssfontparser";

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
    this._stackIndex -= 1;
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
}