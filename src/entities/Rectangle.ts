import { Point2D } from './points/Point2D';
import { Shape } from './Shape';
import { Warehouse } from '../warehouse/Warehouse';

export class Rectangle extends Shape {
  constructor(
    public readonly name: string,
    private _p1: Point2D,
    private _p2: Point2D
  ) {
    super(name);
    Warehouse.getInstance().addShape(this);
  }

  get p1(): Point2D {
    return this._p1;
  }

  set p1(value: Point2D) {
    this._p1 = value;
    this.notifyWarehouse();
  }

  get p2(): Point2D {
    return this._p2;
  }

  set p2(value: Point2D) {
    this._p2 = value;
    this.notifyWarehouse();
  }
}
