import { Point } from './Point';
import { Shape } from './Shape';

export class Pyramid implements Shape {
  constructor(
    public readonly name: string,
    public readonly baseCenter: Point,
    public readonly baseLength: number,
    public readonly height: number
  ) {}
}
