'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (win) {
  var d = win.document;
  var f = win.document.createElement;

  try {
    // get the context 2d.
    var ctx = d.createElement('canvas').getContext('2d');
    if (ctx) {
      console.warn('Context 2d of canvas is exist! No need to mock');
      return win;
    }

    // if ctx not exist, mock it.
    // just mock canvas creator.
    win.document.createElement = function (param) {
      return param === 'canvas' ? (0, _canvas2.default)('canvas') : f.call(d, param);
    };
    return win;
  } catch (_) {
    // catch the throw `Error: Not implemented: HTMLCanvasElement.prototype.getContext`
    // https://github.com/jsdom/jsdom/blob/4c7698f760fc64f20b2a0ddff450eddbdd193176/lib/jsdom/living/nodes/HTMLCanvasElement-impl.js
    return win;
  }
}; /**
    * Created by hustcc 17/12/25.
    * Contract: i@hust.cc
    */