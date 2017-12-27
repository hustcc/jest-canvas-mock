/**
 * Created by hustcc 17/12/25.
 * Contract: i@hust.cc
 */

import createCanvas from './canvas';

export default win => {
  const d = win.document;
  const f = win.document.createElement;

  // get the context 2d.
  const ctx = d.createElement('canvas').getContext('2d');
  if (ctx) {
    console.warn('Context 2d of canvas is exist! No need to mock');
    return win;
  }

  // if ctx not exist, mock it.
  // just mock canvas creator.
  win.document.createElement = (param) => param === 'canvas' ? createCanvas('canvas') : f.call(d, param);
  return win;
};
