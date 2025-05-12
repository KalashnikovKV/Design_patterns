import { Observer, WarehouseEvent, WarehouseEventType } from './Observer';
import { logger } from '../logger/logger';

export class WarehouseLogger implements Observer {
  update(event: WarehouseEvent): void {
    const { type, shape, data } = event;

    switch (type) {
      case WarehouseEventType.ADD:
        logger.info(
          `[WAREHOUSE] Added shape: ${shape.name}, Type: ${shape.constructor.name}`
        );
        if (data) {
          logger.info(
            `[WAREHOUSE] Shape metrics: Area=${data.area}${
              data.volume ? `, Volume=${data.volume}` : ''
            }${data.perimeter ? `, Perimeter=${data.perimeter}` : ''}`
          );
        }
        break;

      case WarehouseEventType.REMOVE:
        logger.info(
          `[WAREHOUSE] Removed shape: ${shape.name}, Type: ${shape.constructor.name}`
        );
        break;

      case WarehouseEventType.UPDATE:
        logger.info(
          `[WAREHOUSE] Updated shape: ${shape.name}, Type: ${shape.constructor.name}`
        );
        if (data) {
          logger.info(
            `[WAREHOUSE] New metrics: Area=${data.area}${
              data.volume ? `, Volume=${data.volume}` : ''
            }${data.perimeter ? `, Perimeter=${data.perimeter}` : ''}`
          );
        }
        break;

      default:
        logger.info(`[WAREHOUSE] Unknown event for shape: ${shape.name}`);
    }
  }
}
