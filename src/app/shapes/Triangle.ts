import { Shape } from './Shape';
import { IDevice } from '../devices/IDevice';
import { ShapeVisitor } from '../visitors/ShapeVisitor';

export class Triangle extends Shape {
    private x1: number;
    private y1: number;
    private x2: number;
    private y2: number;
    private x3: number;
    private y3: number;

    constructor(device: IDevice, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
        super(device);
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
    }

    draw(): void {
        this.device.drawTriangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
    }

    accept(visitor: ShapeVisitor): void {
        visitor.visitTriangle(this);
    }

    getX1(): number { return this.x1; }
    getY1(): number { return this.y1; }
    getX2(): number { return this.x2; }
    getY2(): number { return this.y2; }
    getX3(): number { return this.x3; }
    getY3(): number { return this.y3; }
} 