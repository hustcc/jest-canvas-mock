'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Path2D.prototype
var Path2DFunc = ['addPath', 'closePath', 'moveTo', 'lineTo', 'bezierCurveTo', 'quadraticCurveTo', 'arc', 'arcTo', 'ellipse', 'rect'];

var Path2D = function Path2D() {
  var _this = this;

  _classCallCheck(this, Path2D);

  Path2DFunc.forEach(function (key) {
    _this[key] = jest.fn();
  });
};

exports.default = Path2D;