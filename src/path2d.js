const addPath2D = (win) => {
  if (!win.Path2D) {
    win.Path2D = class Path2D {
      constructor() {
        [
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
        ].forEach((key) => {
          this[key] = jest.fn();
        });
      }
    };
  }
};

export default addPath2D;
