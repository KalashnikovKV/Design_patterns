export abstract class Shape {
  constructor(public readonly name: string) {}

  protected notifyWarehouse(): void {
    const { Warehouse } = require('../warehouse/Warehouse');
    Warehouse.getInstance().updateShape(this);
  }
}
