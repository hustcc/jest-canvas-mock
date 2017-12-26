"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by hustcc 17/12/25.
 * Contract: i@hust.cc
 */

exports.default = {
  fillRect: function fillRect() {},
  clearRect: function clearRect() {},
  getImageData: function getImageData(x, y, w, h) {
    return {
      data: new Array(w * h * 4)
    };
  },
  setLineDash: function setLineDash() {},
  getLineDash: function getLineDash() {
    return [];
  },
  measureText: function measureText(text) {
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