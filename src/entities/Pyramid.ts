import { Point3D } from './points/Point3D';
import { Shape } from './Shape';

export class Pyramid implements Shape {
  constructor(
    public readonly name: string,
    public readonly baseCenter: Point3D,
    public readonly baseLength: number,
    public readonly height: number
  ) {}
}
