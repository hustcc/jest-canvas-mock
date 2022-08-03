/**
 * test canvas
 */

import { ver, setupCanvasMock } from '../src';
import pkg from '../package.json';

let canvas;

beforeEach(() => {
  canvas = document.createElement('canvas');
});

describe('canvas', () => {
  it('should have correct version', () => {
    expect(ver).toBe(pkg.version);
  });
});

describe('setupCanvasMock', () => {
  it('should setup after resetAllMocks', () => {
    jest.resetAllMocks();
    expect(document.createElement('canvas').getContext('2d')).toBe(undefined);
    setupCanvasMock();
    expect(document.createElement('canvas').getContext('2d')).toHaveProperty(
      'createImageData'
    );
  });
});
