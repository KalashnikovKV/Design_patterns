import { Pyramid } from '../entities/Pyramid';
import { Point3D } from '../entities/points/Point3D';
import { Shape } from '../entities/Shape';
import { Creator } from './Creator';

export class PyramidCreator extends Creator {
  protected getPattern(): RegExp {
    return /^(pyramid)\s+«(.+)»$/i;
  }

  factoryMethod(name: string, data: string): Shape | null {
    const parts = data.trim().split(/\s+/).map(Number);
    if (parts.length !== 4 || parts.some(isNaN)) return null;
    return new Pyramid(
      name,
      new Point3D(parts[0], parts[1], parts[2]),
      parts[3],
      parts[2]
    );
  }
}
