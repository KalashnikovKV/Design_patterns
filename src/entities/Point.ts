export class Point {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly z = 0
  ) {}

  static create(x: number, y: number, z = 0): Point {
    return new Point(x, y, z);
  }
}
