# jest-canvas-mock

> Mock `canvas` when run unit test cases with jest. [Reference](https://github.com/Cristy94/canvas-mock/issues/2).

[![Build Status](https://travis-ci.org/hustcc/jest-canvas-mock.svg?branch=master)](https://travis-ci.org/hustcc/jest-canvas-mock)
[![Coverage Status](https://coveralls.io/repos/github/hustcc/jest-canvas-mock/badge.svg?branch=master)](https://coveralls.io/github/hustcc/jest-canvas-mock)
[![npm](https://img.shields.io/npm/v/jest-canvas-mock.svg)](https://www.npmjs.com/package/jest-canvas-mock)
[![npm](https://img.shields.io/npm/dm/jest-canvas-mock.svg)](https://www.npmjs.com/package/jest-canvas-mock)


## Install

This should only be installed as a development dependency (`devDependencies`) as it is only designed for testing.

```bash
npm i --save-dev jest-canvas-mock
```


## Setup

In your `package.json` under the `jest`, create a `setupFiles` array and add `jest-canvas-mock` to the array.

```json
{
  "jest": {
    "setupFiles": ["jest-canvas-mock"]
  }
}
```

If you already have a `setupFiles` attribute you can also append `jest-canvas-mock` to the array.

```json
{
  "jest": {
    "setupFiles": ["./__setups__/other.js", "jest-canvas-mock"]
  }
}
```

More about in [configuration section](https://facebook.github.io/jest/docs/en/configuration.html#content).


## Setup file

Alternatively you can create a new setup file which then requires this module or
add the `require` statement to an existing setup file.

`__setups__/canvas.js`

```js
import 'jest-canvas-mock';
// or
require('jest-canvas-mock');
```

Add that file to your `setupFiles` array:

```json
"jest": {
  "setupFiles": [
    "./__setups__/canvas.js"
  ]
}
```


## License

MIT@[hustcc](https://github.com/hustcc).