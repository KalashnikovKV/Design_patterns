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

      const service = new RectangleService(shape);
      logger.info(
        `✔ ${shape.name}:
        Площадь = ${service.getArea().toFixed(2)}
        Периметр = ${service.getPerimeter().toFixed(2)}
        Является ли квадратом: ${service.isSquare() ? 'Да' : 'Нет'}
        Является ли ромбом: ${service.isRhombus() ? 'Да' : 'Нет'}
        Является ли трапецией: ${service.isTrapezoid() ? 'Да' : 'Нет'}
        Является ли выпуклым: ${service.isConvex() ? 'Да' : 'Нет'}
        Точки образуют прямоугольник: ${
          RectangleValidator.isValid(shape) ? 'Да' : 'Нет'
        }`
      );
    } else if (shape instanceof Pyramid) {
      if (!PyramidValidator.isValid(shape))
        throw new InvalidShapeError('Невалидная пирамида');

      const service = new PyramidService(shape);
      logger.info(
        `✔ ${shape.name}:
        Площадь поверхности = ${service.getArea().toFixed(2)}
        Объём = ${service.getVolume().toFixed(2)}
        Основание на координатной плоскости: ${
          service.isBaseOnPlane() ? 'Да' : 'Нет'
        }
        Соотношение объёмов при сечении:
          - Плоскостью XY: ${service.getVolumeRatio('xy').toFixed(2)}
          - Плоскостью YZ: ${service.getVolumeRatio('yz').toFixed(2)}
          - Плоскостью ZX: ${service.getVolumeRatio('zx').toFixed(2)}`
      );
    }
  } catch (err) {
    logger.error(`✖ Строка ${index + 1}: ${(err as Error).message}`);
  }
});
