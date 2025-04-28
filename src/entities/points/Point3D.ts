import { Point } from './Point';

export class Point3D implements Point {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly z: number
  ) {}

  static create(x: number, y: number, z: number): Point3D {
    return new Point3D(x, y, z);
  }
}
