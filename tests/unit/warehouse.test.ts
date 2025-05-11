import { Warehouse } from '../../src/warehouse/Warehouse';
import { Rectangle } from '../../src/entities/Rectangle';
import { Pyramid } from '../../src/entities/Pyramid';
import { Point2D } from '../../src/entities/points/Point2D';
import { Point3D } from '../../src/entities/points/Point3D';

describe('Warehouse', () => {
  let warehouse: Warehouse;
  let rectangle: Rectangle;
  let pyramid: Pyramid;

  beforeEach(() => {
    warehouse = Warehouse.getInstance();
    rectangle = new Rectangle('rect1', new Point2D(0, 0), new Point2D(4, 3));
    pyramid = new Pyramid('pyr1', new Point3D(0, 0, 0), 4, 6);
  });

  it('should be singleton', () => {
    const instance1 = Warehouse.getInstance();
    const instance2 = Warehouse.getInstance();

    expect(instance1).toBe(instance2);
  });

  it('should store and retrieve rectangle properties', () => {
    expect(warehouse.getArea(rectangle)).toBe(12);
    expect(warehouse.getPerimeter(rectangle)).toBe(14);
    expect(warehouse.getVolume(rectangle)).toBeNull();
  });

  it('should store and retrieve pyramid properties', () => {
    expect(warehouse.getArea(pyramid)).toBeGreaterThan(0);
    expect(warehouse.getVolume(pyramid)).toBe(32);
    expect(warehouse.getPerimeter(pyramid)).toBeNull();
  });

  it('should update properties when shape changes', () => {
    rectangle.p2 = new Point2D(5, 5);
    expect(warehouse.getArea(rectangle)).toBe(25);
    expect(warehouse.getPerimeter(rectangle)).toBe(20);

    pyramid.height = 8;
    // Объем пирамиды = (площадь основания * высота) / 3
    // Площадь основания = 4 * 4 = 16
    // Объем = (16 * 8) / 3 = 42.67
    expect(warehouse.getVolume(pyramid)).toBeCloseTo(42.67, 2);
  });

  it('should remove shape properties', () => {
    warehouse.removeShape(rectangle);
    expect(warehouse.getArea(rectangle)).toBeNull();
    expect(warehouse.getPerimeter(rectangle)).toBeNull();
  });
}); 