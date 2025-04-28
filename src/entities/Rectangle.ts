import { Point2D } from './points/Point2D';
import { Shape } from './Shape';

export class Rectangle implements Shape {
  constructor(
    public readonly name: string,
    public readonly p1: Point2D,
    public readonly p2: Point2D
  ) {}
}
