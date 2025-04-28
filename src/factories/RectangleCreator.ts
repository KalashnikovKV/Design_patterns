import { Rectangle } from '../entities/Rectangle';
import { Point2D } from '../entities/points/Point2D';
import { Shape } from '../entities/Shape';
import { Creator } from './Creator';

export class RectangleCreator extends Creator {
  protected getPattern(): RegExp {
    return /^(rectangle)\s+«(.+)»$/i;
  }

  factoryMethod(name: string, data: string): Shape | null {
    const parts = data.trim().split(/\s+/).map(Number);
    if (parts.length !== 4 || parts.some(isNaN)) return null;
    return new Rectangle(
      name,
      new Point2D(parts[0], parts[1]),
      new Point2D(parts[2], parts[3])
    );
  }
}
