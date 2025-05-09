import { Point2D } from '../entities/points/Point2D';
import { Rectangle } from '../entities/Rectangle';
import { Shape } from '../entities/Shape';
import { ShapeFactory } from './ShapeFactory';

export class RectangleFactory extends ShapeFactory {
  createShape(name: string, data: string): Shape | null {
    const parts = data.trim().split(/\s+/).map(Number);
    if (parts.length !== 4 || parts.some(isNaN)) return null;
    return new Rectangle(
      name,
      new Point2D(parts[0], parts[1]),
      new Point2D(parts[2], parts[3])
    );
  }
}
