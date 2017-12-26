/**
 * Created by hustcc 17/12/25.
 * Contract: i@hust.cc
 */

export default {
  fillRect: () => {},
  clearRect: () => {},
  getImageData: (x, y, w, h) => ({
    data: new Array(w * h * 4)
  }),
  setLineDash: () => {},
  getLineDash: () => [],
  measureText: text => ({
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
