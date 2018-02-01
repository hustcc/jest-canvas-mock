/**
 * Created by hustcc 17/12/25.
 * Contract: i@hust.cc
 */

const context2d = {
  fillRect: () => {},
  clearRect: () => {},
  getImageData: (x = 0, y = 0, w = 0, h = 0) => ({
    data: new Array(w * h * 4)
  }),
  setLineDash: () => {},
  getLineDash: () => [],
  measureText: (text = '') => ({
    width:  12 * (text.length || 0),
    height: 14,
  }),
  putImageData: () => {},
  createImageData: () => [],
  setTransform: () => {},
  resetTransform: () => {},
  drawImage: () => {},
  save: () => {},
  fillText: () => {},
  restore: () => {},
  beginPath: () => {},
  moveTo: () => {},
  lineTo: () => {},
  closePath: () => {},
  stroke: () => {},
  strokeRect: () => {},
  strokeText: () => {},
  t2: () => {},
  transform: () => {},
  translate: () => {},
  scale: () => {},
  rotate: () => {},
  arc: () => {},
  arcTo: () => {},
  fill: () => {},
  rect: () => {},
  quadraticCurveTo: () => {},
  createLinearGradient: () => ({
    addColorStop: () => {},
  }),
  createPattern: () => ({}),
  createRadialGradient: () => ({
    addColorStop: () => {},
  }),
  bezierCurveTo: () => {},
  drawFocusIfNeeded: () => {},
  clip: () => {},
  ellipse: () => {},
  isPointInPath: () => true,
  isPointInStroke: () => true,
};


const jestWrapper = (fs) => {
  const ctx = {}; // immutable
  Object.keys(fs).forEach(key => {
      ctx[key] = jest.fn(fs[key]);
  });
  return ctx;
};

const createContext2d = jest.fn((type, canvas) => {
  const ctx = jestWrapper(context2d);
  ctx.canvas = canvas;
  return ctx;
});

export default createContext2d;
