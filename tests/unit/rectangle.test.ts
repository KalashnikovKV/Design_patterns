import { Rectangle } from '../../src/entities/Rectangle';
import { Point2D } from '../../src/entities/points/Point2D';
import { RectangleService } from '../../src/services/RectangleService';
import { RectangleValidator } from '../../src/validators/RectangleValidator';
import { ShapeParser } from '../../src/parser/ShapeParser';

describe('RectangleService', () => {
  it('should correctly calculate area and perimeter for a rectangle', () => {
    const rect = new Rectangle('rect', new Point2D(0, 0), new Point2D(4, 3));
    const service = new RectangleService(rect);
    const expectedArea = 12;
    const expectedPerimeter = 14;

    const area = service.getArea();
    const perimeter = service.getPerimeter();
    const isSquare = service.isSquare();

    expect(area).toBe(expectedArea);
    expect(perimeter).toBe(expectedPerimeter);
    expect(isSquare).toBe(false);
  });

  it('should detect square correctly', () => {
    const rect = new Rectangle('square', new Point2D(0, 0), new Point2D(3, 3));
    const service = new RectangleService(rect);

    const isSquare = service.isSquare();
    const area = service.getArea();
    const perimeter = service.getPerimeter();

    expect(isSquare).toBe(true);
    expect(area).toBe(9);
    expect(perimeter).toBe(12);
  });

  it('should validate rectangle correctly', () => {
    const validRect = new Rectangle(
      'validRect',
      new Point2D(0, 0),
      new Point2D(4, 3)
    );
    const invalidRect = new Rectangle(
      'invalidRect',
      new Point2D(0, 0),
      new Point2D(0, 3)
    );

    const isValidValidRect = RectangleValidator.isValid(validRect);
    const isValidInvalidRect = RectangleValidator.isValid(invalidRect);

    expect(isValidValidRect).toBe(true);
    expect(isValidInvalidRect).toBe(false);
  });
});

describe('RectangleService additional tests', () => {
  it('should detect intersection with axis correctly', () => {
    const rect = new Rectangle('rect', new Point2D(-1, -1), new Point2D(1, 1));
    const service = new RectangleService(rect);

    const intersects = service.intersectsAxis(0);

    expect(intersects).toBe(true);
  });

  it('should detect no intersection with axis when out of range', () => {
    const rect = new Rectangle('rect', new Point2D(5, 5), new Point2D(6, 6));
    const service = new RectangleService(rect);

    const intersects = service.intersectsAxis(0);

    expect(intersects).toBe(false);
  });

  it('should handle invalid input gracefully', () => {
    const invalidLine = 'rectangle «1.0 2.0 z 4.0»';

    const shape = ShapeParser.parse(invalidLine);

    expect(shape).toBeNull();
  });

  it('should detect if rectangle is convex', () => {
    const rect = new Rectangle('convex', new Point2D(0, 0), new Point2D(4, 3));
    const service = new RectangleService(rect);

    const isConvex = service.isConvex();

    expect(isConvex).toBe(true);
  });

  it('should detect if rectangle is a rhombus', () => {
    const rect = new Rectangle('rhombus', new Point2D(0, 0), new Point2D(3, 3));
    const service = new RectangleService(rect);

    const isRhombus = service.isRhombus();

    expect(isRhombus).toBe(true);
  });

  it('should detect if rectangle is a trapezoid', () => {
    const rect = new Rectangle(
      'trapezoid',
      new Point2D(0, 0),
      new Point2D(4, 3)
    );
    const service = new RectangleService(rect);

    const isTrapezoid = service.isTrapezoid();

    expect(isTrapezoid).toBe(true);
  });
});
