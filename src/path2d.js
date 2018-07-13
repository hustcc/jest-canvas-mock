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

class Path2D {
  constructor() {
    Path2DFunc.forEach((key) => {
      this[key] = jest.fn();
    });
  }
}

export default win => {
  if (!win.Path2D) {
    win.Path2D = Path2D;
  }
};
