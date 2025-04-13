import { parseInputFile } from '../utils/fileParser';
import { ShapeParser } from '../parser/ShapeParser';
import { logger } from '../logger/logger';
import { Rectangle } from '../entities/Rectangle';
import { RectangleValidator } from '../validators/RectangleValidator';
import { RectangleService } from '../services/RectangleService';
import { Pyramid } from '../entities/Pyramid';
import { PyramidValidator } from '../validators/PyramidValidator';
import { PyramidService } from '../services/PyramidService';
import { InvalidShapeError } from '../exceptions/InvalidShapeError';

const lines = parseInputFile('figures.txt');

lines.forEach((line, index) => {
  try {
    const shape = ShapeParser.parse(line);

    if (!shape) {
      throw new InvalidShapeError(`Некорректный формат строки: ${line}`);
    }

    if (shape instanceof Rectangle) {
      if (!RectangleValidator.isValid(shape))
        throw new InvalidShapeError('Невалидный прямоугольник');
      logger.info(
        `✔ ${shape.name}: Площадь = ${RectangleService.getArea(
          shape
        )}, Периметр = ${RectangleService.getPerimeter(shape)}`
      );
    } else if (shape instanceof Pyramid) {
      if (!PyramidValidator.isValid(shape))
        throw new InvalidShapeError('Невалидная пирамида');
      logger.info(
        `✔ ${shape.name}: Площадь = ${PyramidService.getArea(
          shape
        )}, Объём = ${PyramidService.getVolume(shape)}`
      );
    }
  } catch (err) {
    logger.error(`✖ Строка ${index + 1}: ${(err as Error).message}`);
  }
});
