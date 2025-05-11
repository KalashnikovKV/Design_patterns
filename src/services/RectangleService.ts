import { Rectangle } from '../entities/Rectangle';

export class RectangleService {
  constructor(private readonly rectangle: Rectangle) {}

  getArea(): number {
    if (!this.rectangle || !this.rectangle.p1 || !this.rectangle.p2) {
      return 0;
    }
    const width = Math.abs(this.rectangle.p1.x - this.rectangle.p2.x);
    const height = Math.abs(this.rectangle.p1.y - this.rectangle.p2.y);
    return width * height;
  }

  getPerimeter(): number {
    if (!this.rectangle || !this.rectangle.p1 || !this.rectangle.p2) {
      return 0;
    }
    const width = Math.abs(this.rectangle.p1.x - this.rectangle.p2.x);
    const height = Math.abs(this.rectangle.p1.y - this.rectangle.p2.y);
    return 2 * (width + height);
  }

  isSquare(): boolean {
    const width = Math.abs(this.rectangle.p1.x - this.rectangle.p2.x);
    const height = Math.abs(this.rectangle.p1.y - this.rectangle.p2.y);
    return width === height;
  }

  isRhombus(): boolean {
    return this.isSquare();
  }

  isTrapezoid(): boolean {
    // Прямоугольник всегда является трапецией,
    // так как имеет две пары параллельных сторон
    return true;
  }

  isConvex(): boolean {
    // Прямоугольник всегда является выпуклым многоугольником,
    // так как все его углы равны 90 градусов
    return true;
  }

  intersectsAxis(distance: number): boolean {
    const minX = Math.min(this.rectangle.p1.x, this.rectangle.p2.x);
    const maxX = Math.max(this.rectangle.p1.x, this.rectangle.p2.x);
    const minY = Math.min(this.rectangle.p1.y, this.rectangle.p2.y);
    const maxY = Math.max(this.rectangle.p1.y, this.rectangle.p2.y);

    return (
      (minX <= distance && maxX >= -distance) ||
      (minY <= distance && maxY >= -distance)
    );
  }
}
