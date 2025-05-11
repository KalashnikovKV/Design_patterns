import { Shape } from '../entities/Shape';
import { ShapeSpecification } from './specifications/ShapeSpecification';

export interface ShapeRepository {
  add(shape: Shape): void;
  remove(shape: Shape): void;
  findById(id: string): Shape | null;
  findByName(name: string): Shape | null;
  findBySpecification(specification: ShapeSpecification): Shape[];
  findAll(): Shape[];
  sort(comparator: (a: Shape, b: Shape) => number): Shape[];
} 