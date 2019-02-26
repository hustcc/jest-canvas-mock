import parseColor from 'parse-color';

export default class CanvasGradient {
  constructor() {
    this.addColorStop = jest.fn(this.addColorStop.bind(this));
  }
  addColorStop(offset, color) {
    var numoffset = Number(offset);
    var colorstr = String(color);
    if (!Number.isFinite(numoffset) || numoffset < 0 || numoffset > 1) {
      throw new DOMException('IndexSizeError', 'Failed to execute \'addColorStop\' on \'CanvasGradient\': The provided value (\'' + numoffset + '\') is outside the range (0.0, 1.0)');
    }
    let output = parseColor(colorstr);
    if (!output.hex) {
      throw new SyntaxError('Failed to execute \'addColorStop\' on \'CanvasGradient\': The value provided (\'' + color + '\') could not be parsed as a color.')
    }
  }
}
