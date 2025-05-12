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
import { Repository, RepositoryImpl } from '../repository/Repository';
import { FigureComparator } from '../repository/comparators/FigureComparator';
import { Warehouse } from '../warehouse/Warehouse';
import { WarehouseLogger } from '../warehouse/WarehouseLogger';

const repository: Repository = new RepositoryImpl();

const warehouse = Warehouse.getInstance();
const warehouseLogger = new WarehouseLogger();
warehouse.attach(warehouseLogger);

const lines = parseInputFile('figures.txt');

lines.forEach((line, index) => {
  try {
    const shape = ShapeParser.parse(line);

    if (!shape) {
      throw new InvalidShapeError(`Некорректный формат строки: ${line}`);
    }

    repository.add(shape);

    warehouse.addShape(shape);

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

logger.info('=== ОТЛАДОЧНАЯ ИНФОРМАЦИЯ ===');
const allShapes = repository.findAll();
logger.info(`Всего фигур в репозитории: ${allShapes.length}`);

if (allShapes.length > 0) {
  logger.info('Имена всех фигур в репозитории:');
  allShapes.forEach((shape) => {
    logger.info(`- ${shape.name} (${shape.constructor.name})`);
  });
}

const idComparator = FigureComparator.byId();
const nameComparator = FigureComparator.byName();
const xComparator = FigureComparator.byFirstPointX();
const yComparator = FigureComparator.byFirstPointY();

const sortedById = repository.sort(idComparator);
logger.info(
  `Фигуры, отсортированные по ID: ${JSON.stringify(
    sortedById.map((shape) => shape.name)
  )}`
);

const sortedByName = repository.sort(nameComparator);
logger.info(
  `Фигуры, отсортированные по имени: ${JSON.stringify(
    sortedByName.map((shape) => shape.name)
  )}`
);

const sortedByX = repository.sort(xComparator);
logger.info(
  `Фигуры, отсортированные по X координате: ${JSON.stringify(
    sortedByX.map((shape) => shape.name)
  )}`
);

const sortedByY = repository.sort(yComparator);
logger.info(
  `Фигуры, отсортированные по Y координате: ${JSON.stringify(
    sortedByY.map((shape) => shape.name)
  )}`
);

logger.info('Демонстрация работы паттерна Observer:');

if (allShapes.length > 0) {
  const shapeToUpdate = allShapes[0];
  logger.info(`Обновляем фигуру: ${shapeToUpdate.name}`);

  warehouse.updateShape(shapeToUpdate);

  if (allShapes.length > 1) {
    const shapeToRemove = allShapes[1];
    logger.info(`Удаляем фигуру: ${shapeToRemove.name}`);
    warehouse.removeShape(shapeToRemove);
  }
}
