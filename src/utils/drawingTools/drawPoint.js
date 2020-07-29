export default class DrawPoint {
  constructor(x, y, time) {
    this.x = x;
    this.y = y;
    this.time = time || new Date().getTime();
  }
}
