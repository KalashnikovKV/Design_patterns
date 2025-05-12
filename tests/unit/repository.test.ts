import { Rectangle } from '../../src/entities/Rectangle';
import { Pyramid } from '../../src/entities/Pyramid';
import { Point2D } from '../../src/entities/points/Point2D';
import { Point3D } from '../../src/entities/points/Point3D';
import { FirstQuadrantSpecification } from '../../src/repository/specifications/FirstQuadrantSpecification';
import { AreaRangeSpecification } from '../../src/repository/specifications/AreaRangeSpecification';
import { RepositoryImpl } from '../../src/repository/Repository';
import { PyramidCreator } from '../../src/factories/PyramidCreator';
import { RectangleCreator } from '../../src/factories/RectangleCreator';
import { Shape } from '../../src/entities/Shape';
import { FigureComparator } from '../../src/repository/comparators/FigureComparator';

describe('ShapeRepository', () => {
  let repository: RepositoryImpl;
  let rectangle: Shape;
  let pyramid: Shape;
  let pyramidCreator: PyramidCreator;
  let rectangleCreator: RectangleCreator;

  beforeEach(() => {
    repository = new RepositoryImpl();
    rectangleCreator = new RectangleCreator();
    pyramidCreator = new PyramidCreator();

    rectangle = rectangleCreator.factoryMethod('rect1', '0 0 4 3') as Rectangle;
    pyramid = pyramidCreator.factoryMethod('pyr1', '0 0 0 4') as Pyramid;
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
    const rect1 = rectangleCreator.factoryMethod(
      'rect1',
      '1 1 4 3'
    ) as Rectangle;
    const rect2 = rectangleCreator.factoryMethod(
      'rect2',
      '-1 -1 2 2'
    ) as Rectangle;
    const pyr1 = pyramidCreator.factoryMethod('pyr1', '2 2 0 4') as Pyramid;

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
    const rect1 = rectangleCreator.factoryMethod(
      'rect1',
      '0 0 2 2'
    ) as Rectangle;
    const rect2 = rectangleCreator.factoryMethod(
      'rect2',
      '0 0 4 4'
    ) as Rectangle;
    const pyr1 = pyramidCreator.factoryMethod('pyr1', '0 0 0 2') as Pyramid;

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
    const rect1 = rectangleCreator.factoryMethod(
      'rect1',
      '0 0 2 2'
    ) as Rectangle;
    const rect2 = rectangleCreator.factoryMethod(
      'rect2',
      '0 0 4 4'
    ) as Rectangle;
    const pyr1 = pyramidCreator.factoryMethod('pyr1', '0 0 0 2') as Pyramid;

    repository.add(rect1);
    repository.add(rect2);
    repository.add(pyr1);

    const sortedShapes = repository.sort(FigureComparator.byName());

    expect(sortedShapes[0]).toBe(pyr1);
    expect(sortedShapes[1]).toBe(rect1);
    expect(sortedShapes[2]).toBe(rect2);
  });
});
