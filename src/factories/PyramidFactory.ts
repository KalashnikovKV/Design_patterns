import { Point } from '../entities/Point';
import { Pyramid } from '../entities/Pyramid';

export class PyramidFactory {
  static createFromString(name: string, input: string): Pyramid | null {
    const parts = input.trim().split(/\s+/).map(Number);
    if (parts.length !== 4 || parts.some(isNaN)) return null;
    return new Pyramid(
      name,
      new Point(parts[0], parts[1], parts[2]),
      parts[3],
      parts[2]
    );
  }
}
