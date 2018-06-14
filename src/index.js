/**
 * Created by hustcc 17/12/25.
 * Contract: i@hust.cc
 */

import mockWindow  from './window';

// mock global window
if (typeof window !== 'undefined') {
  global.window = mockWindow(window);
}
