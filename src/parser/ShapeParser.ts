import { RectangleFactory } from '../factories/RectangleFactory';
import { PyramidFactory } from '../factories/PyramidFactory';
import { Shape } from '../entities/Shape';
import { ShapeFactory } from '../factories/ShapeFactory';

const SHAPE_REGEX = /^(rectangle|pyramid)\s+«(.+)»$/i;

export class ShapeParser {
  private static factories: Map<string, ShapeFactory> = new Map([
    ['rectangle', new RectangleFactory()],
    ['pyramid', new PyramidFactory()],
  ]);

  static parse(line: string): Shape | null {
    const match = line.trim().match(SHAPE_REGEX);
    if (!match) return null;

    const [_, type, rawData] = match;
    const name = `${type}_${Math.floor(Math.random() * 10000)}`;
    const factory = this.factories.get(type.toLowerCase());

    if (!factory) return null;

    return factory.createShape(name, rawData.trim());
  }
}
