// Path2D.prototype
const Path2DFunc = [
  'addPath',
  'closePath',
  'moveTo',
  'lineTo',
  'bezierCurveTo',
  'quadraticCurveTo',
  'arc',
  'arcTo',
  'ellipse',
  'rect',
];

export default class Path2D {
  constructor() {
    Path2DFunc.forEach((key) => {
      this[key] = jest.fn();
    });
  }
}
