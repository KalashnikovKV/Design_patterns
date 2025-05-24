import { FigureComparator } from '../../../src/repository/comparators/FigureComparator';
import { Rectangle } from '../../../src/entities/Rectangle';
import { Pyramid } from '../../../src/entities/Pyramid';
import { Point2D } from '../../../src/entities/points/Point2D';
import { Point3D } from '../../../src/entities/points/Point3D';

describe('FigureComparator', () => {


  describe('byName', () => {
    it('should sort shapes by name', () => {
      const shapes = [
        new Rectangle('z_rect', new Point2D(0, 0), new Point2D(1, 1)),
        new Rectangle('a_rect', new Point2D(0, 0), new Point2D(1, 1)),
        new Pyramid('m_pyr', new Point3D(0, 0, 0), 1, 1)
      ];

      const comparator = FigureComparator.byName();
      const sorted = shapes.sort((a, b) => comparator.compare(a, b));

      expect(sorted[0].name).toBe('a_rect');
      expect(sorted[1].name).toBe('m_pyr');
      expect(sorted[2].name).toBe('z_rect');
    });
  });

  describe('byFirstPointX', () => {
    it('should sort shapes by first point X coordinate', () => {
      const shapes = [
        new Rectangle('rect1', new Point2D(2, 0), new Point2D(3, 1)),
        new Rectangle('rect2', new Point2D(0, 0), new Point2D(1, 1)),
        new Pyramid('pyr1', new Point3D(1, 0, 0), 1, 1)
      ];

      const comparator = FigureComparator.byFirstPointX();
      const sorted = shapes.sort((a, b) => comparator.compare(a, b));

      expect(sorted[0].name).toBe('rect2');
      expect(sorted[1].name).toBe('pyr1');
      expect(sorted[2].name).toBe('rect1');
    });
  });

  describe('byFirstPointY', () => {
    it('should sort shapes by first point Y coordinate', () => {
      const shapes = [
        new Rectangle('rect1', new Point2D(0, 2), new Point2D(1, 3)),
        new Rectangle('rect2', new Point2D(0, 0), new Point2D(1, 1)),
        new Pyramid('pyr1', new Point3D(0, 1, 0), 1, 1)
      ];

      const comparator = FigureComparator.byFirstPointY();
      const sorted = shapes.sort((a, b) => comparator.compare(a, b));

      expect(sorted[0].name).toBe('rect2');
      expect(sorted[1].name).toBe('pyr1');
      expect(sorted[2].name).toBe('rect1');
    });
  });
}); 