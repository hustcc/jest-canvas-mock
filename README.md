# jest-canvas-mock

> Mock `canvas` when run unit test cases with jest.

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

## Mock Strategy

This mock strategy implements all the canvas functions and actually verifies the parameters. If a
known condition would cause the browser to throw a `TypeError` or a `DOMException`, it emulates the
error. For instance, the `CanvasRenderingContext2D#arc` function will throw a `TypeError` if the
radius is negative, or if it was not provided with enough parameters.

```ts
expect(() => ctx.arc(1, 2, 3, 4)).toThrow(TypeError);
expect(() => ctx.arc(0, 0, -10, 0, Math.PI * 2)).toThrow(TypeError);
```

The function will do `Number` type coercion and verify the inputs exactly like the browser does. So
this is valid input.

```ts
expect(() => ctx.arc("10", "10", "20", "0", "6.14")).not.toThrow();
```

Another part of the strategy is to validate input types. When using the
`CanvasRenderingContext2D#fill` function, if you pass it an invalid `fillRule` it will throw a
`TypeError` just like the browser does.

```ts
expect(() => ctx.fill("invalid!")).toThrow(TypeError);
expect(() => ctx.fill(new Path2D(), "invalid!")).toThrow(TypeError);
```

We try to follow the ECMAScript specification as closely as possible.

## Override default mock return value

You can override the default mock return value in your test to suit your need. For example, to override return value of `toDataURL`:

```ts
HTMLCanvasElement.prototype.toDataURL = jest
  .fn()
  .mockReturnValue(
    'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
  );
```

## License

MIT@[hustcc](https://github.com/hustcc).
