/**
 * test canvas
 */

import { ver } from '../src';
import pkg from '../package.json';

describe('canvas', () => {
  test('version', () => {
    expect(ver).toBe(pkg.version);
  });

  test('context creation of type 2d returns CanvasRenderingContext2D', () => {
    const ctx = document.createElement('canvas').getContext('2d');
    expect(ctx).toBeInstanceOf(CanvasRenderingContext2D);
  });

  test('context creation of any other type returns null', () => {
    expect(document.createElement('canvas').getContext('webgl')).toBe(null);
  });
});
