import { Point3D } from './points/Point3D';
import { Shape } from './Shape';
import { Warehouse } from '../warehouse/Warehouse';

export class Pyramid extends Shape {
  constructor(
    public readonly name: string,
    private _baseCenter: Point3D,
    private _baseLength: number,
    private _height: number
  ) {
    super(name);
    Warehouse.getInstance().addShape(this);
  }

  get baseCenter(): Point3D {
    return this._baseCenter;
  }

  set baseCenter(value: Point3D) {
    this._baseCenter = value;
    this.notifyWarehouse();
  }

  get baseLength(): number {
    return this._baseLength;
  }

  set baseLength(value: number) {
    this._baseLength = value;
    this.notifyWarehouse();
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
    this.notifyWarehouse();
  }
}
