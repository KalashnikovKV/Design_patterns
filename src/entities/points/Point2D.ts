import { Point } from './Point';

export class Point2D implements Point {
  constructor(public readonly x: number, public readonly y: number) {}

  static create(x: number, y: number): Point2D {
    return new Point2D(x, y);
  }
}
