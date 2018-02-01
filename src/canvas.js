/**
 * Created by hustcc 17/12/25.
 * Contract: i@hust.cc
 */

import createContext2d from './context2d';

const createCanvas = () => {
  const div = document.createElement('div'); // use div to mock it's api

  div.getContext = param => param === '2d' ? createContext2d('2d', div) : {};
  return div;
};

export default jest.fn(createCanvas);
