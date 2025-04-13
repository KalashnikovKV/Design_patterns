import { RectangleFactory } from '../factories/RectangleFactory';
import { PyramidFactory } from '../factories/PyramidFactory';
import { Shape } from '../entities/Shape';

const SHAPE_REGEX = /^(rectangle|pyramid)\s+«(.+)»$/i;

export class ShapeParser {
  static parse(line: string): Shape | null {
    const match = line.trim().match(SHAPE_REGEX);
    if (!match) return null;

    const [_, type, rawData] = match;
    const name = `${type}_${Math.floor(Math.random() * 10000)}`;
    const data = rawData.trim();

    if (type.toLowerCase() === 'rectangle') {
      const rectangle = RectangleFactory.createFromString(name, data);
      if (!rectangle) return null;
      return rectangle;
    }

    if (type.toLowerCase() === 'pyramid') {
      const pyramid = PyramidFactory.createFromString(name, data);
      if (!pyramid) return null;
      return pyramid;
    }

    return null;
  }
}
