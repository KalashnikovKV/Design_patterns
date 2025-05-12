import { Shape } from '../entities/Shape';
import { Rectangle } from '../entities/Rectangle';
import { Pyramid } from '../entities/Pyramid';
import { RectangleService } from '../services/RectangleService';
import { PyramidService } from '../services/PyramidService';
import {
  Observer,
  Subject,
  WarehouseEvent,
  WarehouseEventType,
} from './Observer';

export class Warehouse implements Subject {
  private static instance: Warehouse;
  private shapes: Map<
    string,
    { area: number; volume?: number; perimeter?: number }
  > = new Map();
  private observers: Observer[] = [];

  private constructor() {}

  static getInstance(): Warehouse {
    if (!Warehouse.instance) {
      Warehouse.instance = new Warehouse();
    }
    return Warehouse.instance;
  }

  attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return;
    }
    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return;
    }
    this.observers.splice(observerIndex, 1);
  }

  notify(event: WarehouseEvent): void {
    for (const observer of this.observers) {
      observer.update(event);
    }
  }

  addShape(shape: Shape): void {
    let shapeData: { area: number; volume?: number; perimeter?: number };

    if (shape instanceof Rectangle) {
      const service = new RectangleService(shape);
      shapeData = {
        area: service.getArea(),
        perimeter: service.getPerimeter(),
      };
      this.shapes.set(shape.name, shapeData);
    } else if (shape instanceof Pyramid) {
      const service = new PyramidService(shape);
      shapeData = {
        area: service.getArea(),
        volume: service.getVolume(),
      };
      this.shapes.set(shape.name, shapeData);
    } else {
      return;
    }

    this.notify({
      type: WarehouseEventType.ADD,
      shape: shape,
      data: shapeData,
    });
  }

  removeShape(shape: Shape): void {
    const wasRemoved = this.shapes.delete(shape.name);

    if (wasRemoved) {
      this.notify({
        type: WarehouseEventType.REMOVE,
        shape: shape,
      });
    }
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
    const oldData = this.shapes.get(shape.name);

    let shapeData: { area: number; volume?: number; perimeter?: number };

    if (shape instanceof Rectangle) {
      const service = new RectangleService(shape);
      shapeData = {
        area: service.getArea(),
        perimeter: service.getPerimeter(),
      };
      this.shapes.set(shape.name, shapeData);
    } else if (shape instanceof Pyramid) {
      const service = new PyramidService(shape);
      shapeData = {
        area: service.getArea(),
        volume: service.getVolume(),
      };
      this.shapes.set(shape.name, shapeData);
    } else {
      return;
    }

    if (oldData) {
      this.notify({
        type: WarehouseEventType.UPDATE,
        shape: shape,
        data: shapeData,
      });
    }
  }

  getAllShapes(): Map<
    string,
    { area: number; volume?: number; perimeter?: number }
  > {
    return new Map(this.shapes);
  }
}
