let ctx;
beforeEach(() => {
  // get a new context each test
  ctx = document.createElement('canvas').getContext('2d');
});

afterEach(() => {
  const events = ctx.__getEvents();
  expect(events).toMatchSnapshot();
});

describe('__clearEvents', () => {
  it('should clear the list of events', () => {
    ctx.fillRect(1, 2, 3, 4);
    ctx.__clearEvents();
  });

  it('should not prevent additional events from being collected', () => {
    ctx.fillRect(1, 2, 3, 4);
    ctx.__clearEvents();
    ctx.fillRect(1, 2, 3, 4);
  });
});
