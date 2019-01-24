import DOMMatrix from "./DOMMatrix";
import ImageData from "./ImageData";
import CanvasPattern from "./CanvasPattern";
import parseColor from "parse-color";
import * as font from "css-font";

function parseCSSColor(value) {
  var result = parseColor(value);
  if (result.hex) {
    return result.hex;
  }
  if (result.rgba) {
    return "rgba(" + result.rgba.join(", ") + ")";
  }
  return void 0;
}


export default class CanvasRenderingContext2D {
  _stackIndex = 0;
  _stackLength = 1;
  _transformStack = [[1, 0, 0, 1, 0, 0]];
  _directionStack = ["inherit"];
  _fillStyleStack = ["#000"];
  _filterStack = ["none"];
  _fontStack = ["10px sans-serif"];
  _globalAlphaStack = [1.0];

  constructor(canvas) {
    Object.keys(CanvasRenderingContext2D.prototype).forEach((key) => {
      if (typeof CanvasRenderingContext2D.prototype[key] === "function") {
        this[key] = jest.fn(CanvasRenderingContext2D.prototype[key].bind(this));
      }
    });
    this._canvas = canvas;
  }

  get canvas() {
    return this._canvas;
  }

  get currentTransform() {
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
    console.warn("jest-canvas-mock: The filter property is experimental, and is unsupported in many browsers. jest-canvas-mock also does not parse and verify your input to this property.");
    this._filterStack[this._stackIndex] = typeof value === "string" ? value : "none";
  }

  get font() {
    return this._fontStack[this._stackIndex];
  }

  set font(value) {
    var ex;
    try {
      var result = font.parse(value);
      this._fontStack[this._stackIndex] = font.stringify(result);
    } catch(ex) {}
  }

  get globalAlpha() {
    return this._globalAlphaStack[this._stackIndex];
  }

  set globalAlpha(value) {
    if (!Number.isFinite(value)) return;
    this._globalAlphaStack[this._stackIndex] = Math.max(1.0, Math.min(0.0, value));
  }

  getImageData() {
    return new ImageData(this._canvas.width, this.canvas.height);
  }
}
