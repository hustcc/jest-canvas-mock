'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by hustcc 17/12/25.
 * Contract: i@hust.cc
 */

var context2d = {
  fillRect: function fillRect() {},
  clearRect: function clearRect() {},
  getImageData: function getImageData() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var w = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    return {
      data: new Array(w * h * 4)
    };
  },
  setLineDash: function setLineDash() {},
  getLineDash: function getLineDash() {
    return [];
  },
  measureText: function measureText() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return {
      width: 12 * (text.length || 0),
      height: 14
    };
  },
  putImageData: function putImageData() {},
  createImageData: function createImageData() {
    return [];
  },
  setTransform: function setTransform() {},
  resetTransform: function resetTransform() {},
  drawImage: function drawImage() {},
  save: function save() {},
  fillText: function fillText() {},
  restore: function restore() {},
  beginPath: function beginPath() {},
  moveTo: function moveTo() {},
  lineTo: function lineTo() {},
  closePath: function closePath() {},
  stroke: function stroke() {},
  strokeRect: function strokeRect() {},
  strokeText: function strokeText() {},
  t2: function t2() {},
  transform: function transform() {},
  translate: function translate() {},
  scale: function scale() {},
  rotate: function rotate() {},
  arc: function arc() {},
  arcTo: function arcTo() {},
  fill: function fill() {},
  rect: function rect() {},
  quadraticCurveTo: function quadraticCurveTo() {},
  createLinearGradient: function createLinearGradient() {
    return {
      addColorStop: function addColorStop() {}
    };
  },
  createPattern: function createPattern() {
    return {};
  },
  createRadialGradient: function createRadialGradient() {
    return {
      addColorStop: function addColorStop() {}
    };
  },
  bezierCurveTo: function bezierCurveTo() {},
  drawFocusIfNeeded: function drawFocusIfNeeded() {},
  clip: function clip() {},
  ellipse: function ellipse() {},
  isPointInPath: function isPointInPath() {
    return true;
  },
  isPointInStroke: function isPointInStroke() {
    return true;
  }
};

var jestWrapper = function jestWrapper(fs) {
  var ctx = {}; // immutable
  Object.keys(fs).forEach(function (key) {
    ctx[key] = jest.fn(fs[key]);
  });
  return ctx;
};

var createContext2d = jest.fn(function (type, canvas) {
  var ctx = jestWrapper(context2d);
  ctx.canvas = canvas;
  return ctx;
});

exports.default = createContext2d;