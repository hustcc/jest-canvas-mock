export default class ImageData {
  _width = 0;
  _height = 0;
  _data = null;

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get data() {
    return this._data;
  }

  constructor(width, height) {
    if (!Number.isFinite(height)) throw new TypeError('The source height is zero or not a number.');
    if (height === 0) throw new TypeError('The source height is zero or not a number.');
    if (!Number.isFinite(width)) throw new TypeError('The source width is zero or not a number.');
    if (width === 0) throw new TypeError('The source height is zero or not a number.');
    this._width = width;
    this._height = height;
    this._data = new Uint8ClampedArray(width * height * 4);
  }
}
