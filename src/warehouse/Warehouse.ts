import { Shape } from '../entities/Shape';
import { Rectangle } from '../entities/Rectangle';
import { Pyramid } from '../entities/Pyramid';
import { RectangleService } from '../services/RectangleService';
import { PyramidService } from '../services/PyramidService';

export class Warehouse {
  private static instance: Warehouse;
  private shapes: Map<string, { area: number; volume?: number; perimeter?: number }> = new Map();

  private constructor() {}

  static getInstance(): Warehouse {
    if (!Warehouse.instance) {
      Warehouse.instance = new Warehouse();
    }
    return Warehouse.instance;
  }

  addShape(shape: Shape): void {
    if (shape instanceof Rectangle) {
      const service = new RectangleService(shape);
      this.shapes.set(shape.name, {
        area: service.getArea(),
        perimeter: service.getPerimeter()
      });
    } else if (shape instanceof Pyramid) {
      const service = new PyramidService(shape);
      this.shapes.set(shape.name, {
        area: service.getArea(),
        volume: service.getVolume()
      });
    }
  }

  removeShape(shape: Shape): void {
    this.shapes.delete(shape.name);
  }

  getArea(shape: Shape): number | null {
    return this.shapes.get(shape.name)?.area || null;
  }

  getVolume(shape: Shape): number | null {
    return this.shapes.get(shape.name)?.volume || null;
  }

  getPerimeter(shape: Shape): number | null {
    return this.shapes.get(shape.name)?.perimeter || null;
  }

  updateShape(shape: Shape): void {
    this.addShape(shape);
  }
} 