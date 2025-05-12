import { Warehouse } from '../../src/warehouse/Warehouse';
import { Rectangle } from '../../src/entities/Rectangle';
import { Pyramid } from '../../src/entities/Pyramid';
import { Point2D } from '../../src/entities/points/Point2D';
import {
  Observer,
  WarehouseEvent,
  WarehouseEventType,
} from '../../src/warehouse/Observer';
import { RectangleCreator } from '../../src/factories/RectangleCreator';
import { PyramidCreator } from '../../src/factories/PyramidCreator';
import { PyramidService } from '../../src/services/PyramidService';

class TestObserver implements Observer {
  public events: WarehouseEvent[] = [];

  update(event: WarehouseEvent): void {
    this.events.push({ ...event });
  }

  clearEvents(): void {
    this.events = [];
  }
}

describe('Warehouse', () => {
  let warehouse: Warehouse;
  let rectangle: Rectangle;
  let pyramid: Pyramid;
  let testObserver: TestObserver;
  let rectangleCreator: RectangleCreator;
  let pyramidCreator: PyramidCreator;

  beforeEach(() => {
    warehouse = Warehouse.getInstance();
    rectangleCreator = new RectangleCreator();
    pyramidCreator = new PyramidCreator();

    rectangle = rectangleCreator.factoryMethod('rect1', '0 0 4 3') as Rectangle;
    pyramid = pyramidCreator.factoryMethod('pyr1', '0 0 0 4') as Pyramid;

    testObserver = new TestObserver();
  });

  it('should be singleton', () => {
    const instance1 = Warehouse.getInstance();
    const instance2 = Warehouse.getInstance();

    expect(instance1).toBe(instance2);
  });

  it('should store and retrieve rectangle properties', () => {
    warehouse.addShape(rectangle);
    expect(warehouse.getArea(rectangle)).toBe(12);
    expect(warehouse.getPerimeter(rectangle)).toBe(14);
    expect(warehouse.getVolume(rectangle)).toBeNull();
  });

  it('should update properties when shape changes', () => {
    warehouse.addShape(rectangle);
    warehouse.addShape(pyramid);

    rectangle.p2 = new Point2D(5, 5);
    warehouse.updateShape(rectangle);
    expect(warehouse.getArea(rectangle)).toBe(25);
    expect(warehouse.getPerimeter(rectangle)).toBe(20);

    pyramid.height = 8;
    warehouse.updateShape(pyramid);
    expect(warehouse.getVolume(pyramid)).toBeCloseTo(42.67, 2);
  });

  it('should remove shape properties', () => {
    warehouse.addShape(rectangle);
    warehouse.removeShape(rectangle);
    expect(warehouse.getArea(rectangle)).toBeNull();
    expect(warehouse.getPerimeter(rectangle)).toBeNull();
  });

  it('should notify observers when a shape is added', () => {
    warehouse.attach(testObserver);
    warehouse.addShape(rectangle);

    expect(testObserver.events.length).toBe(1);
    expect(testObserver.events[0].type).toBe(WarehouseEventType.ADD);
    expect(testObserver.events[0].shape).toBe(rectangle);
    expect(testObserver.events[0].data?.area).toBe(12);
    expect(testObserver.events[0].data?.perimeter).toBe(14);
  });

  it('should notify observers when a shape is removed', () => {
    warehouse.attach(testObserver);
    warehouse.addShape(rectangle);
    testObserver.clearEvents();
    warehouse.removeShape(rectangle);

    expect(testObserver.events.length).toBe(1);
    expect(testObserver.events[0].type).toBe(WarehouseEventType.REMOVE);
    expect(testObserver.events[0].shape).toBe(rectangle);
  });

  it('should not notify detached observers', () => {
    warehouse.attach(testObserver);
    warehouse.detach(testObserver);
    warehouse.addShape(rectangle);

    expect(testObserver.events.length).toBe(0);
  });
});
