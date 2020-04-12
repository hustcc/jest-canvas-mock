let canvas;
let ctx;

beforeEach(() => {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
});

describe('font', () => {
  it('should not accept invalid fonts', () => {
    ctx.font = 'invalid';
    expect(ctx.font).toBe('10px sans-serif');
  });

  it('should accept valid fonts', () => {
    ctx.font = '12pt Times New Roman';
    expect(ctx.font).toBe('16px "Times New Roman"');
  });

  it('should save and restore font values', () => {
    ctx.save();
    ctx.font = '12pt Times New Roman';
    ctx.restore();
    expect(ctx.font).toBe('10px sans-serif');
  });
});
