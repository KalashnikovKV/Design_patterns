import { Circle } from '../shapes/Circle';
import { Rectangle } from '../shapes/Rectangle';
import { Triangle } from '../shapes/Triangle';

export interface ShapeVisitor {
    visitCircle(circle: Circle): void;
    visitRectangle(rectangle: Rectangle): void;
    visitTriangle(triangle: Triangle): void;
} 