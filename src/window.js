/**
 * Created by hustcc 17/12/25.
 * Contract: i@hust.cc
 */

import Path2D from './classes/Path2D';
import CanvasGradient from './classes/CanvasGradient';
import CanvasPattern from './classes/CanvasPattern';
import CanvasRenderingContext2D from './classes/CanvasRenderingContext2D';
import DOMMatrix from './classes/DOMMatrix';
import ImageData from './classes/ImageData';
import TextMetrics from './classes/TextMetrics';
import ImageBitmap from './classes/ImageBitmap';
import mockPrototype from './mock/prototype';
import createImageBitmap from './mock/createImageBitmap';

export default (win) => {
  const d = win.document;
  const f = win.document.createElement;

  // jsdom@11.6.2 || jest@^22.0.0, console.error in Function getContext();
  // https://github.com/jsdom/jsdom/blob/4c7698f760fc64f20b2a0ddff450eddbdd193176/lib/jsdom/living/nodes/HTMLCanvasElement-impl.js#L55-L58
  // console.error will make ci error.
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
  /*
  win.document.createElement = param => param.toString().toLowerCase() === 'canvas'
    ? createCanvas('canvas')
    : f.call(d, param);
  */
  // if not exist, then mock it.
  if (!win.Path2D) win.Path2D = Path2D;
  if (!win.CanvasGradient) win.CanvasGradient = CanvasGradient;
  if (!win.CanvasPattern) win.CanvasPattern = CanvasPattern;
  if (!win.CanvasRenderingContext2D)
    win.CanvasRenderingContext2D = CanvasRenderingContext2D;
  if (!win.DOMMatrix) win.DOMMatrix = DOMMatrix;
  if (!win.ImageData) win.ImageData = ImageData;
  if (!win.TextMetrics) win.TextMetrics = TextMetrics;
  if (!win.ImageBitmap) win.ImageBitmap = ImageBitmap;
  if (!win.createImageBitmap) win.createImageBitmap = createImageBitmap;

  mockPrototype(win);

  return win;
};
