import { Point } from '../entities/Point';
import { Rectangle } from '../entities/Rectangle';

export class RectangleFactory {
  static createFromString(name: string, input: string): Rectangle | null {
    const parts = input.trim().split(/\s+/).map(Number);
    if (parts.length !== 4 || parts.some(isNaN)) return null;
    return new Rectangle(
      name,
      new Point(parts[0], parts[1]),
      new Point(parts[2], parts[3])
    );
  }
}
