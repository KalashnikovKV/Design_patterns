import { Rectangle } from '../entities/Rectangle';

export class RectangleValidator {
  static isValid(rect: Rectangle): boolean {
    return rect.p1.x !== rect.p2.x && rect.p1.y !== rect.p2.y;
  }
}
