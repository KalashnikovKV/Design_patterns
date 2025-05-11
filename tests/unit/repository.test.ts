import { ShapeRepositoryImpl } from '../../src/repository/ShapeRepositoryImpl';
import { Rectangle } from '../../src/entities/Rectangle';
import { Pyramid } from '../../src/entities/Pyramid';
import { Point2D } from '../../src/entities/points/Point2D';
import { Point3D } from '../../src/entities/points/Point3D';
import { FirstQuadrantSpecification } from '../../src/repository/specifications/FirstQuadrantSpecification';
import { AreaRangeSpecification } from '../../src/repository/specifications/AreaRangeSpecification';

describe('ShapeRepository', () => {
  let repository: ShapeRepositoryImpl;
  let rectangle: Rectangle;
  let pyramid: Pyramid;

  beforeEach(() => {
    repository = new ShapeRepositoryImpl();
    rectangle = new Rectangle('rect1', new Point2D(0, 0), new Point2D(4, 3));
    pyramid = new Pyramid('pyr1', new Point3D(0, 0, 0), 4, 6);
  });

  it('should add and find shapes', () => {
    repository.add(rectangle);
    repository.add(pyramid);

    expect(repository.findById('rect1')).toBe(rectangle);
    expect(repository.findByName('pyr1')).toBe(pyramid);
  });

  it('should remove shapes', () => {
    repository.add(rectangle);
    repository.remove(rectangle);

    expect(repository.findById('rect1')).toBeNull();
  });

  it('should find shapes in first quadrant', () => {
    const rect1 = new Rectangle('rect1', new Point2D(1, 1), new Point2D(4, 3));
    const rect2 = new Rectangle('rect2', new Point2D(-1, -1), new Point2D(2, 2));
    const pyr1 = new Pyramid('pyr1', new Point3D(2, 2, 0), 4, 6);

    repository.add(rect1);
    repository.add(rect2);
    repository.add(pyr1);

    const firstQuadrantShapes = repository.findBySpecification(
      new FirstQuadrantSpecification()
    );

    expect(firstQuadrantShapes).toContain(rect1);
    expect(firstQuadrantShapes).not.toContain(rect2);
    expect(firstQuadrantShapes).toContain(pyr1);
  });

  it('should find shapes by area range', () => {
    const rect1 = new Rectangle('rect1', new Point2D(0, 0), new Point2D(2, 2));
    const rect2 = new Rectangle('rect2', new Point2D(0, 0), new Point2D(4, 4));
    const pyr1 = new Pyramid('pyr1', new Point3D(0, 0, 0), 2, 3);

    repository.add(rect1);
    repository.add(rect2);
    repository.add(pyr1);

    const shapesInRange = repository.findBySpecification(
      new AreaRangeSpecification(3, 5)
    );

    expect(shapesInRange).toContain(rect1);
    expect(shapesInRange).not.toContain(rect2);
  });

  it('should sort shapes by name', () => {
    const rect1 = new Rectangle('rect1', new Point2D(0, 0), new Point2D(2, 2));
    const rect2 = new Rectangle('rect2', new Point2D(0, 0), new Point2D(4, 4));
    const pyr1 = new Pyramid('pyr1', new Point3D(0, 0, 0), 2, 3);

    repository.add(rect1);
    repository.add(rect2);
    repository.add(pyr1);

    const sortedShapes = repository.sort((a, b) => a.name.localeCompare(b.name));

    expect(sortedShapes[0]).toBe(pyr1);
    expect(sortedShapes[1]).toBe(rect1);
    expect(sortedShapes[2]).toBe(rect2);
  });
}); 