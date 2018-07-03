/**
 * test canvas
 */

import createCanvas from '../src/canvas';
import createContext2d from '../src/context2d';
import mockWindow  from '../src/window';

describe('canvas', () => {
  beforeEach(() => {
    createCanvas.mockClear();
  });

  test('document.createElement(canvas)', () => {
    const canvas = document.createElement('canvas');
    expect(canvas.getContext).not.toBe(undefined);
    expect(createCanvas).toHaveBeenLastCalledWith('canvas');

    const div = document.createElement('div');
    expect(div.getContext).toBe(undefined);
  });

  test('document.createElement(CANVAS)', () => {
    const canvas = document.createElement('CANVAS');
    expect(canvas.getContext).not.toBe(undefined);
    expect(createCanvas).toHaveBeenLastCalledWith('canvas');
  });

  test('canvas.getContext(2d)', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    expect(typeof ctx).toEqual('object');
    expect(createContext2d).toHaveBeenLastCalledWith('2d', canvas);

    expect(canvas.getContext('webgl')).toEqual({});
  });

  test('canvas.toDataURL()', () => {
    const canvas = document.createElement('canvas');
    expect(canvas.toDataURL('image/jpeg', 1.0)).toEqual('');
    expect(canvas.toDataURL).toHaveBeenLastCalledWith('image/jpeg', 1.0);
  });

  test('ctx.functions', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    expect(typeof ctx).toBe('object');

    Object.keys(ctx).forEach(key => {
      if(typeof ctx[key] === "function"){
        ctx[key]();
      }
    });

    [
      'fillRect',
      'clearRect',
      'getImageData',
      'setLineDash',
      'getLineDash',
      'measureText',
      'putImageData',
      'createImageData',
      'setTransform',
      'resetTransform',
      'drawImage',
      'save',
      'fillText',
      'restore',
      'beginPath',
      'moveTo',
      'lineTo',
      'closePath',
      'stroke',
      'strokeRect',
      'strokeText', 
      't2',
      'transform',
      'translate',
      'scale',
      'rotate',
      'arc',
      'arcTo',
      'fill',
      'rect',
      'quadraticCurveTo',
      'createLinearGradient',
      'createPattern',
      'createRadialGradient',
      'bezierCurveTo',
      'drawFocusIfNeeded',
      'clip',
      'ellipse',
      'isPointInPath',
      'isPointInStroke',
    ].forEach((key) => {
      expect(ctx[key]).toBeCalled();
    });
  });

  test('different instances', () => {
    const canvas1 = document.createElement('canvas');
    const ctx1 = canvas1.getContext('2d');
    expect(ctx1.canvas).toBe(canvas1);

    const canvas2 = document.createElement('canvas');
    const ctx2 = canvas2.getContext('2d');
    expect(ctx2.canvas).toBe(canvas2);

    expect(canvas1).not.toBe(canvas2);
    expect(ctx1).not.toBe(ctx2);
  });

  test('Path2D', () => {
    const path = new Path2D();

    expect(path).toBeDefined();

    Object.keys(path.constructor.prototype).forEach(key => {
      if(typeof path[key] === "function"){
        path[key]();
      }
    });

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
      expect(path[key]).toBeCalled();
    });
  });

  test('Path2D not override', () => {
    const saved = window.Path2D;
    mockWindow(window);
    expect(saved === window.Path2D).toBe(true);
  });
});
