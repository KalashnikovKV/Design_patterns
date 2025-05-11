import { Shape } from '../../entities/Shape';
import { ShapeSpecification } from './ShapeSpecification';
import { Rectangle } from '../../entities/Rectangle';
import { Pyramid } from '../../entities/Pyramid';
import { RectangleService } from '../../services/RectangleService';
import { PyramidService } from '../../services/PyramidService';

export class AreaRangeSpecification implements ShapeSpecification {
  constructor(
    private readonly minArea: number,
    private readonly maxArea: number
  ) {}

  isSatisfiedBy(shape: Shape): boolean {
    let area: number;
    
    if (shape instanceof Rectangle) {
      const service = new RectangleService(shape);
      area = service.getArea();
    } else if (shape instanceof Pyramid) {
      const service = new PyramidService(shape);
      area = service.getArea();
    } else {
      return false;
    }

    return area >= this.minArea && area <= this.maxArea;
  }
} 