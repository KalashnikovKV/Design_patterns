import { Rectangle } from '../../src/entities/Rectangle';
import { Point } from '../../src/entities/Point';
import { RectangleService } from '../../src/services/RectangleService';
import { RectangleValidator } from '../../src/validators/RectangleValidator';
import { ShapeParser } from '../../src/parser/ShapeParser';

describe('RectangleService', () => {
  it('should correctly calculate area and perimeter for a rectangle', () => {
    const rect = new Rectangle('rect', new Point(0, 0), new Point(4, 3));
    const expectedArea = 12;
    const expectedPerimeter = 14;

    const area = RectangleService.getArea(rect);
    const perimeter = RectangleService.getPerimeter(rect);
    const isSquare = RectangleService.isSquare(rect);

    expect(area).toBe(expectedArea);
    expect(perimeter).toBe(expectedPerimeter);
    expect(isSquare).toBe(false);
  });

  it('should detect square correctly', () => {
    const rect = new Rectangle('square', new Point(0, 0), new Point(3, 3));

    const isSquare = RectangleService.isSquare(rect);
    const area = RectangleService.getArea(rect);
    const perimeter = RectangleService.getPerimeter(rect);

    expect(isSquare).toBe(true);
    expect(area).toBe(9);
    expect(perimeter).toBe(12);
  });

  it('should validate rectangle correctly', () => {
    const validRect = new Rectangle(
      'validRect',
      new Point(0, 0),
      new Point(4, 3)
    );
    const invalidRect = new Rectangle(
      'invalidRect',
      new Point(0, 0),
      new Point(0, 3)
    );

    const isValidValidRect = RectangleValidator.isValid(validRect);
    const isValidInvalidRect = RectangleValidator.isValid(invalidRect);

    expect(isValidValidRect).toBe(true);
    expect(isValidInvalidRect).toBe(false);
  });
});

describe('RectangleService additional tests', () => {
  it('should detect intersection with axis correctly', () => {
    const rect = new Rectangle('rect', new Point(-1, -1), new Point(1, 1));
    const intersects = RectangleService.intersectsAxis(rect, 0);
    expect(intersects).toBe(true);
  });

  it('should detect no intersection with axis when out of range', () => {
    const rect = new Rectangle('rect', new Point(5, 5), new Point(6, 6));
    const intersects = RectangleService.intersectsAxis(rect, 0);
    expect(intersects).toBe(false);
  });

  it('should handle invalid input gracefully', () => {
    const invalidLine = 'rectangle «1.0 2.0 z 4.0»';
    const shape = ShapeParser.parse(invalidLine);
    expect(shape).toBeNull();
  });

  it('should detect if rectangle is convex', () => {
    const rect = new Rectangle('convex', new Point(0, 0), new Point(4, 3));
    const isConvex = RectangleService.isConvex(rect);
    expect(isConvex).toBe(true);
  });

  it('should detect if rectangle is a rhombus', () => {
    const rect = new Rectangle('rhombus', new Point(0, 0), new Point(3, 3));
    const isRhombus = RectangleService.isRhombus(rect);
    expect(isRhombus).toBe(true);
  });

  it('should detect if rectangle is a trapezoid', () => {
    const rect = new Rectangle('trapezoid', new Point(0, 0), new Point(4, 3));
    const isTrapezoid = RectangleService.isTrapezoid(rect);
    expect(isTrapezoid).toBe(true);
  });
});
