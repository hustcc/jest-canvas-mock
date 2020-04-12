let ctx;
beforeEach(() => {
  // get a new context each test
  ctx = document.createElement('canvas').getContext('2d');
});

afterEach(() => {
  const events = ctx.__getPath();
  expect(events).toMatchSnapshot();
});

describe('__clearEvents', () => {
  it('should clear the list of events', () => {
    ctx.arc(1, 2, 3, 4, 5);
    ctx.__clearPath();
  });

  it('should not prevent additional events from being collected', () => {
    ctx.arc(1, 2, 3, 4, 5);
    ctx.__clearPath();
    ctx.arc(1, 2, 3, 4, 5);
  });
});
