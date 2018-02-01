'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _context2d = require('./context2d');

var _context2d2 = _interopRequireDefault(_context2d);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createCanvas = function createCanvas() {
  var div = document.createElement('div'); // use div to mock it's api

  div.getContext = function (param) {
    return param === '2d' ? (0, _context2d2.default)('2d', div) : {};
  };
  return div;
}; /**
    * Created by hustcc 17/12/25.
    * Contract: i@hust.cc
    */

exports.default = jest.fn(createCanvas);