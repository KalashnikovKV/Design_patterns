import { IDevice } from '../devices/IDevice';
import { ShapeVisitor } from '../visitors/ShapeVisitor';

export abstract class Shape {
    protected device: IDevice;

    constructor(device: IDevice) {
        this.device = device;
    }

    abstract draw(): void;
    abstract accept(visitor: ShapeVisitor): void;
} 