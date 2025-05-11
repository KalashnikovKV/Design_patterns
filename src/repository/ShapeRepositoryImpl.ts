import { Shape } from '../entities/Shape';
import { ShapeRepository } from './ShapeRepository';
import { ShapeSpecification } from './specifications/ShapeSpecification';

export class ShapeRepositoryImpl implements ShapeRepository {
  private shapes: Map<string, Shape> = new Map();

  add(shape: Shape): void {
    this.shapes.set(shape.name, shape);
  }

  remove(shape: Shape): void {
    this.shapes.delete(shape.name);
  }

  findById(id: string): Shape | null {
    return this.shapes.get(id) || null;
  }

  findByName(name: string): Shape | null {
    return this.shapes.get(name) || null;
  }

  findBySpecification(specification: ShapeSpecification): Shape[] {
    return Array.from(this.shapes.values()).filter(shape => 
      specification.isSatisfiedBy(shape)
    );
  }

  findAll(): Shape[] {
    return Array.from(this.shapes.values());
  }

  sort(comparator: (a: Shape, b: Shape) => number): Shape[] {
    return this.findAll().sort(comparator);
  }
} 