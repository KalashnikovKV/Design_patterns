import { RectangleCreator } from '../factories/RectangleCreator';
import { PyramidCreator } from '../factories/PyramidCreator';
import { Shape } from '../entities/Shape';
import { Creator } from '../factories/Creator';

export class ShapeParser {
  private static creators: Creator[] = [
    new RectangleCreator(),
    new PyramidCreator(),
  ];

  static parse(line: string): Shape | null {
    for (const creator of this.creators) {
      const shape = creator.create(line);
      if (shape) return shape;
    }
    return null;
  }
}
