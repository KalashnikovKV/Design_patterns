import { Shape } from '../../entities/Shape';
import { ShapeSpecification } from './ShapeSpecification';
import { Rectangle } from '../../entities/Rectangle';
import { Pyramid } from '../../entities/Pyramid';

export class FirstQuadrantSpecification implements ShapeSpecification {
  isSatisfiedBy(shape: Shape): boolean {
    if (shape instanceof Rectangle) {
      return shape.p1.x >= 0 && shape.p1.y >= 0 && shape.p2.x >= 0 && shape.p2.y >= 0;
    }
    if (shape instanceof Pyramid) {
      return shape.baseCenter.x >= 0 && shape.baseCenter.y >= 0;
    }
    return false;
  }
} 