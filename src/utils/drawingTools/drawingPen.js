export default class DrawingPen {
  constructor(strokes) {
    this.strokes = strokes || [];
    this._offsetX = 0;
    this._offsetY = 0;
  }

  addNewStroke(points) {
    if (points.length > 0) {
      this.strokes.push(points);
    }

    console.log('this.strokes', this.strokes);
  }

  backwardStroke() {
    if (this.strokes.length < 1) {
      return;
    }

    this.strokes.pop();
  }

  setOffset(options) {
    if (!options) {
      return;
    }
    this._offsetX = options.x;
    this._offsetY = options.y;
  }

  pointsToSvg(points) {
    if (points.length > 0) {
      let path = `M ${points[0].x},${points[0].y}`;
      points.forEach((point) => {
        path = path + ` L ${point.x},${point.y}`;
      });
      console.log('PATH', path);
      return path;
    } else {
      return '';
    }
  }

  clear = () => {
    this.strokes = [];
  };
}
