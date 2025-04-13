import { Rectangle } from '../entities/Rectangle';

export class RectangleService {
  static getArea(rect: Rectangle): number {
    const width = Math.abs(rect.p1.x - rect.p2.x);
    const height = Math.abs(rect.p1.y - rect.p2.y);
    return width * height;
  }

  static getPerimeter(rect: Rectangle): number {
    const width = Math.abs(rect.p1.x - rect.p2.x);
    const height = Math.abs(rect.p1.y - rect.p2.y);
    return 2 * (width + height);
  }

  static isSquare(rect: Rectangle): boolean {
    const width = Math.abs(rect.p1.x - rect.p2.x);
    const height = Math.abs(rect.p1.y - rect.p2.y);
    return width === height;
  }

  static isRhombus(rect: Rectangle): boolean {
    const width = Math.abs(rect.p1.x - rect.p2.x);
    const height = Math.abs(rect.p1.y - rect.p2.y);
    return width === height;
  }

  static isTrapezoid(rect: Rectangle): boolean {
    return true;
  }

  static isConvex(rect: Rectangle): boolean {
    return true;
  }

  static intersectsAxis(rect: Rectangle, distance: number): boolean {
    const minX = Math.min(rect.p1.x, rect.p2.x);
    const maxX = Math.max(rect.p1.x, rect.p2.x);
    const minY = Math.min(rect.p1.y, rect.p2.y);
    const maxY = Math.max(rect.p1.y, rect.p2.y);

    return (
      (minX <= distance && maxX >= -distance) ||
      (minY <= distance && maxY >= -distance)
    );
  }
}
