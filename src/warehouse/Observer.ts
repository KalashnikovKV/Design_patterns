import { Shape } from '../entities/Shape';

export enum WarehouseEventType {
  ADD = 'add',
  REMOVE = 'remove',
  UPDATE = 'update',
}

export interface WarehouseEvent {
  type: WarehouseEventType;
  shape: Shape;
  data?: { area?: number; volume?: number; perimeter?: number };
}

export interface Observer {
  update(event: WarehouseEvent): void;
}

export interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(event: WarehouseEvent): void;
}
