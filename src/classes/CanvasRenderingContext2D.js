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
    this._stackIndex += 1;
  }

  restore() {
    this._transformStack.pop();
    this._directionStack.pop();
    this._fillStyleStack.pop();
    this._filterStack.pop();
    this._fontStack.pop();
    this._globalAlphaStack.pop();
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
    if (compositeOperations.includes(value)) {
      this._globalCompositeOperationStack[this._stackIndex] = value;
    }
  }
}
