'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var addPath2D = function addPath2D(win) {
  if (!win.Path2D) {
    win.Path2D = function Path2D() {
      var _this = this;

      _classCallCheck(this, Path2D);

      ['addPath', 'closePath', 'moveTo', 'lineTo', 'bezierCurveTo', 'quadraticCurveTo', 'arc', 'arcTo', 'ellipse', 'rect'].forEach(function (key) {
        _this[key] = jest.fn();
      });
    };
  }
};

exports.default = addPath2D;