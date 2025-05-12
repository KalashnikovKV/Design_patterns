import { Shape } from '../../entities/Shape';
import { ShapeSpecification } from './ShapeSpecification';
import { Rectangle } from '../../entities/Rectangle';
import { Pyramid } from '../../entities/Pyramid';

export class DistanceFromOriginSpecification implements ShapeSpecification {
  constructor(
    private readonly minDistance: number,
    private readonly maxDistance: number
  ) {}

  isSatisfiedBy(shape: Shape): boolean {
    let distance: number;
    
    if (shape instanceof Rectangle) {
      const x = (shape.p1.x + shape.p2.x) / 2;
      const y = (shape.p1.y + shape.p2.y) / 2;
      distance = Math.sqrt(x * x + y * y);
    } else if (shape instanceof Pyramid) {
      const { x, y } = shape.baseCenter;
      distance = Math.sqrt(x * x + y * y);
    } else {
      return false;
    }

    return distance >= this.minDistance && distance <= this.maxDistance;
  }
} 