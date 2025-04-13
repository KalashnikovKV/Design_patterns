import { Point } from './Point';
import { Shape } from './Shape';

export class Rectangle implements Shape {
  constructor(
    public readonly name: string,
    public readonly p1: Point,
    public readonly p2: Point
  ) {}
}
