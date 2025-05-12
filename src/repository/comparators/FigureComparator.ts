import { Shape } from '../../entities/Shape';
import { Rectangle } from '../../entities/Rectangle';
import { Pyramid } from '../../entities/Pyramid';
import { Comparator } from './Comparator';

export class FigureComparator implements Comparator<Shape> {
  private constructor(private compareFn: (a: Shape, b: Shape) => number) {}

  compare(a: Shape, b: Shape): number {
    return this.compareFn(a, b);
  }

  static byId(): FigureComparator {
    return new FigureComparator((a: Shape, b: Shape) => {
      const matchA = a.name.match(/([^_]+)_(\d+)/);
      const matchB = b.name.match(/([^_]+)_(\d+)/);

      if (!matchA || !matchB) {
        return a.name.localeCompare(b.name);
      }

      const typeA = matchA[1];
      const typeB = matchB[1];

      if (typeA !== typeB) {
        return typeA.localeCompare(typeB);
      }

      const idA = parseInt(matchA[2]);
      const idB = parseInt(matchB[2]);
      return idA - idB;
    });
  }

  static byName(): FigureComparator {
    return new FigureComparator((a: Shape, b: Shape) =>
      a.name.localeCompare(b.name)
    );
  }

  static byFirstPointX(): FigureComparator {
    return new FigureComparator((a: Shape, b: Shape) => {
      let xA = 0,
        xB = 0;

      if (a instanceof Rectangle) {
        xA = a.p1.x;
      } else if (a instanceof Pyramid) {
        xA = a.baseCenter.x;
      }

      if (b instanceof Rectangle) {
        xB = b.p1.x;
      } else if (b instanceof Pyramid) {
        xB = b.baseCenter.x;
      }

      return xA - xB;
    });
  }

  static byFirstPointY(): FigureComparator {
    return new FigureComparator((a: Shape, b: Shape) => {
      let yA = 0,
        yB = 0;

      if (a instanceof Rectangle) {
        yA = a.p1.y;
      } else if (a instanceof Pyramid) {
        yA = a.baseCenter.y;
      }

      if (b instanceof Rectangle) {
        yB = b.p1.y;
      } else if (b instanceof Pyramid) {
        yB = b.baseCenter.y;
      }

      return yA - yB;
    });
  }
}
