import { Shape } from '../entities/Shape';
import { ShapeSpecification } from './specifications/ShapeSpecification';
import { Comparator } from './comparators/Comparator';
import { FigureComparator } from './comparators/FigureComparator';

export interface Repository {
  add(shape: Shape): void;
  remove(shape: Shape): void;
  findById(id: string): Shape | null;
  findByName(name: string): Shape | null;
  findBySpecification(specification: ShapeSpecification): Shape[];
  findAll(): Shape[];
  sort(comparator: Comparator<Shape>): Shape[];
}

export class RepositoryImpl implements Repository {
  private shapes: Map<string, Shape> = new Map();

  add(shape: Shape): void {
    this.shapes.set(shape.name, shape);
  }

  remove(shape: Shape): void {
    this.shapes.delete(shape.name);
  }

  findById(id: string): Shape | null {
    return this.findByName(id);
  }

  findByName(name: string): Shape | null {
    return this.shapes.get(name) || null;
  }

  findBySpecification(specification: ShapeSpecification): Shape[] {
    return Array.from(this.shapes.values()).filter((shape) =>
      specification.isSatisfiedBy(shape)
    );
  }

  findAll(): Shape[] {
    return Array.from(this.shapes.values());
  }

  sort(comparator: Comparator<Shape>): Shape[] {
    return this.findAll().sort((a, b) => comparator.compare(a, b));
  }

  sortById(): Shape[] {
    return this.sort(FigureComparator.byId());
  }

  sortByName(): Shape[] {
    return this.sort(FigureComparator.byName());
  }

  sortByFirstPointX(): Shape[] {
    return this.sort(FigureComparator.byFirstPointX());
  }

  sortByFirstPointY(): Shape[] {
    return this.sort(FigureComparator.byFirstPointY());
  }
}
