import { Shape } from '../../entities/Shape';

export interface ShapeSpecification {
  isSatisfiedBy(shape: Shape): boolean;
} 