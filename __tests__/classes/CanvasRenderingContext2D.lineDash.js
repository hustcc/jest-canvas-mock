var canvas;
var ctx;

beforeEach(() => {
  canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = 400;
  canvas.height = 300;
});

function every(items, callback) {
  for (let i = 0; i < items.length; i++) {
    if (callback(items[i])) {
      continue;
    }
    return false;
  }
  return true;
}

function map(items, callback) {
  var result = [];
  for(let i = 0; i < items.length; i++) {
    result.push(callback(items[i]));
  }
  return result;
}

var isSequence = (value) => [
  Array,
  Int8Array,
  Uint8Array,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array,
].reduce((left, right) => left || value instanceof right, false);

describe("lineDash", () => {
  it("should accept valid lineDash values ignore invalid lineDash values", () => {
    var examples = [
      [1, 2, 3, 4],
      [1, 2, 3],
      [null, 4, 2],
      [Infinity, -1, 4],
      ["1", "2", "3"],
      new Float64Array([1, 2, 3, 4]),
      "blah",
      0,
      -1,
      Infinity,
      null,
    ];

    examples.forEach(e => {
      ctx.setLineDash([]); // reset the linedash
      if(!isSequence(e)) {
        expect(() => ctx.setLineDash(e)).toThrow(TypeError);
      } else {
        ctx.setLineDash(e);
        var result = map(e, val => Number(val));
        var containsFiniteValues = every(result, val => Number.isFinite(val));
        if (containsFiniteValues) {
          result = result.length % 2 === 1 ? result.concat(result) : result;
        } else {
          result = [];
        }
        expect(ctx.getLineDash()).toEqual(result);
      }
    });
  });

  it("should save and restore lineDash values", () => {
    ctx.save();
    ctx.setLineDash([1, 2, 3]);
    expect(ctx.getLineDash()).toEqual([1, 2, 3, 1, 2, 3]);
    ctx.restore();
    expect(ctx.getLineDash()).toEqual([]);
  });
});
