import { Shape } from '../entities/Shape';

export abstract class ShapeFactory {
  abstract createShape(name: string, data: string): Shape | null;
}
