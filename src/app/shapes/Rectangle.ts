import { Shape } from './Shape';
import { IDevice } from '../devices/IDevice';
import { ShapeVisitor } from '../visitors/ShapeVisitor';

export class Rectangle extends Shape {
    private x: number;
    private y: number;
    private width: number;
    private height: number;

    constructor(device: IDevice, x: number, y: number, width: number, height: number) {
        super(device);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(): void {
        this.device.drawRectangle(this.x, this.y, this.width, this.height);
    }

    accept(visitor: ShapeVisitor): void {
        visitor.visitRectangle(this);
    }

    getX(): number { return this.x; }
    getY(): number { return this.y; }
    getWidth(): number { return this.width; }
    getHeight(): number { return this.height; }
} 