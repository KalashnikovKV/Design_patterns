import { Point } from '../entities/Point';
import { Pyramid } from '../entities/Pyramid';
import { Shape } from '../entities/Shape';
import { ShapeFactory } from './ShapeFactory';

export class PyramidFactory extends ShapeFactory {
  createShape(name: string, data: string): Shape | null {
    const parts = data.trim().split(/\s+/).map(Number);
    if (parts.length !== 4 || parts.some(isNaN)) return null;
    return new Pyramid(
      name,
      new Point(parts[0], parts[1], parts[2]),
      parts[3],
      parts[2]
    );
  }
}
