import { Shape } from './Shape';
import { IDevice } from '../devices/IDevice';
import { ShapeVisitor } from '../visitors/ShapeVisitor';

export class Circle extends Shape {
    private x: number;
    private y: number;
    private radius: number;

    constructor(device: IDevice, x: number, y: number, radius: number) {
        super(device);
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    draw(): void {
        this.device.drawCircle(this.x, this.y, this.radius);
    }

    accept(visitor: ShapeVisitor): void {
        visitor.visitCircle(this);
    }

    getX(): number { return this.x; }
    getY(): number { return this.y; }
    getRadius(): number { return this.radius; }
} 