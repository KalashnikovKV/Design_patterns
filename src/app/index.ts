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

      const area = RectangleService.getArea(shape);
      const perimeter = RectangleService.getPerimeter(shape);
      const isSquare = RectangleService.isSquare(shape);
      const isRhombus = RectangleService.isRhombus(shape);
      const isTrapezoid = RectangleService.isTrapezoid(shape);
      const isConvex = RectangleService.isConvex(shape);

      logger.info(
        `✔ ${shape.name}:
        Площадь = ${area.toFixed(2)}
        Периметр = ${perimeter.toFixed(2)}
        Является ли квадратом: ${isSquare ? 'Да' : 'Нет'}
        Является ли ромбом: ${isRhombus ? 'Да' : 'Нет'}
        Является ли трапецией: ${isTrapezoid ? 'Да' : 'Нет'}
        Является ли выпуклым: ${isConvex ? 'Да' : 'Нет'}
        Точки образуют прямоугольник: ${
          RectangleValidator.isValid(shape) ? 'Да' : 'Нет'
        }`
      );
    } else if (shape instanceof Pyramid) {
      if (!PyramidValidator.isValid(shape))
        throw new InvalidShapeError('Невалидная пирамида');

      const area = PyramidService.getArea(shape);
      const volume = PyramidService.getVolume(shape);
      const isBaseOnPlane = PyramidService.isBaseOnPlane(shape);
      const volumeRatioXY = PyramidService.getVolumeRatio(shape, 'xy');
      const volumeRatioYZ = PyramidService.getVolumeRatio(shape, 'yz');
      const volumeRatioZX = PyramidService.getVolumeRatio(shape, 'zx');

      logger.info(
        `✔ ${shape.name}:
        Площадь поверхности = ${area.toFixed(2)}
        Объём = ${volume.toFixed(2)}
        Основание на координатной плоскости: ${isBaseOnPlane ? 'Да' : 'Нет'}
        Соотношение объёмов при сечении:
          - Плоскостью XY: ${volumeRatioXY.toFixed(2)}
          - Плоскостью YZ: ${volumeRatioYZ.toFixed(2)}
          - Плоскостью ZX: ${volumeRatioZX.toFixed(2)}`
      );
    }
  } catch (err) {
    logger.error(`✖ Строка ${index + 1}: ${(err as Error).message}`);
  }
});
