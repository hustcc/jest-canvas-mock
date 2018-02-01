/**
 * test canvas
 */

import createCanvas from '../src/canvas';
import createContext2d from '../src/context2d';

describe('canvas', () => {
  test('document.createElement(canvas)', () => {
    const canvas = document.createElement('canvas');
    expect(canvas.getContext).not.toBe(undefined);
    expect(createCanvas).toHaveBeenLastCalledWith('canvas');

    const div = document.createElement('div');
    expect(div.getContext).toBe(undefined);
  });

  test('canvas.getContext(2d)', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    expect(typeof ctx).toEqual('object');
    expect(createContext2d).toHaveBeenLastCalledWith('2d', canvas);

    expect(canvas.getContext('webgl')).toEqual({});
  });

  test('ctx.functions', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    expect(typeof ctx).toBe('object');
    expect(ctx.canvas).toBeDefined();

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
});
