/**
 * Created by hustcc 17/12/25.
 * Contract: i@hust.cc
 */

import context2d from './context2d';

const div = document.createElement('div'); // use div to mock it's api

div.getContext = param => param === '2d' ? context2d : {};

export default div;
