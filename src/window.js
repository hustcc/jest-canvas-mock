/**
 * Created by hustcc 17/12/25.
 * Contract: i@hust.cc
 */

import createCanvas from './canvas';

export default win => {
  const d = win.document;
  const f = win.document.createElement;

  // jsdom@11.6.2 || jest@^22.0.0, console.error in Function getContext();
  // https://github.com/jsdom/jsdom/blob/4c7698f760fc64f20b2a0ddff450eddbdd193176/lib/jsdom/living/nodes/HTMLCanvasElement-impl.js#L55-L58
  // cosole.error will make ci error.
  // try {
  //   // get the context 2d.
  //   const ctx = d.createElement('canvas').getContext('2d');
  //
  //   // if canvas and context2d all exist, means mock is not needed.
  //   if (ctx) {
  //     console.warn('Context 2d of canvas is exist! No need to mock');
  //     return win;
  //   }
  // } catch (_) {
  //   // catch the throw `Error: Not implemented: HTMLCanvasElement.prototype.getContext`
  //   // https://github.com/jsdom/jsdom/blob/4c7698f760fc64f20b2a0ddff450eddbdd193176/lib/jsdom/living/nodes/HTMLCanvasElement-impl.js
  //   // when throw error, means mock is needed.
  //   // code continue
  // }
  // if ctx not exist, mock it.
  // just mock canvas creator.

  win.document.createElement = (param) => param.toString().toLowerCase() === 'canvas' 
    ? createCanvas('canvas') 
    : f.call(d, param);

  if (!win.Path2D) {
    win.Path2D = class Path2D {};
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
      win.Path2D.prototype[key] = jest.fn();
    })
  }

  return win;
};
