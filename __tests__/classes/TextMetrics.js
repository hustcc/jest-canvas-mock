const props = [
  'width',
  'actualBoundingBoxLeft',
  'actualBoundingBoxRight',
  'fontBoundingBoxAscent',
  'fontBoundingBoxDescent',
  'actualBoundingBoxAscent',
  'actualBoundingBoxDescent',
  'emHeightAscent',
  'emHeightDescent',
  'hangingBaseline',
  'alphabeticBaseline',
  'ideographicBaseline',
];

describe('TextMetrics', () => {
  it('should return a text metrics object', () => {
    const m = new TextMetrics('test');
    expect(m).toBeInstanceOf(TextMetrics);
  });

  it('should have a width of text length for testing purposes', () => {
    ['one', 'two1', 'three', undefined, 1, null, 102].forEach((val) => {
      val = String(val);
      const m = new TextMetrics(val);
      expect(m.width).toBe(val.length);
    });
  });

  it('should have every property defined in the specification', () => {
    const m = new TextMetrics('');
    props.forEach((val) => {
      expect(m[val]).toBe(0);
    });
  });
});
