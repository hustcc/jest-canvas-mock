let ctx;
beforeEach(() => {
  // get a new context each test
  ctx = document.createElement('canvas').getContext('2d');
});

afterEach(() => {
  const drawCalls = ctx.__getDrawCalls();
  expect(drawCalls).toMatchSnapshot();
});

describe('__clearDrawCalls', () => {
  it('should clear the list of draw calls', () => {
    ctx.fillRect(1, 2, 3, 4);
    ctx.__clearDrawCalls();
  });

  it('should not prevent additional draw calls from being collected', () => {
    ctx.fillRect(1, 2, 3, 4);
    ctx.__clearDrawCalls();
    ctx.fillRect(1, 2, 3, 4);
  });
});
