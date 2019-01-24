/**
 * Created by hustcc 17/12/25.
 * Contract: i@hust.cc
 */

import mockWindow  from './window';

// mock global window
// TODO: Force coverage to ignore this branch
if (typeof window !== 'undefined') {
  global.window = mockWindow(window);
}

export const ver = '__VERSION__';
