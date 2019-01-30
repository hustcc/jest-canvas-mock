

export default class CanvasGradient {
  constructor() {
    this.addColorStop = jest.fn(this.addColorStop.bind(this));
  }
  addColorStop() {

  }
}
