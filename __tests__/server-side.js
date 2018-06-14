/**
 * @jest-environment node
 */

/**
 * test canvas mock in a node environment
 */

import createCanvas from '../src/canvas';

describe('canvas', () => {
  test('running in node environment fails silently', () => {
    expect(createCanvas).toBeDefined();
  })
});