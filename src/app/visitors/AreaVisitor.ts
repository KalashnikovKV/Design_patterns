import { ShapeVisitor } from './ShapeVisitor';
import { Circle } from '../shapes/Circle';
import { Rectangle } from '../shapes/Rectangle';
import { Triangle } from '../shapes/Triangle';

export class AreaVisitor implements ShapeVisitor {
    private totalArea: number = 0;

    visitCircle(circle: Circle): void {
        const area = Math.PI * Math.pow(circle.getRadius(), 2);
        this.totalArea += area;
        console.log(`Площадь круга: ${area.toFixed(2)}`);
    }

    visitRectangle(rectangle: Rectangle): void {
        const area = rectangle.getWidth() * rectangle.getHeight();
        this.totalArea += area;
        console.log(`Площадь прямоугольника: ${area.toFixed(2)}`);
    }

    visitTriangle(triangle: Triangle): void {
        const a = Math.sqrt(Math.pow(triangle.getX2() - triangle.getX1(), 2) + 
                          Math.pow(triangle.getY2() - triangle.getY1(), 2));
        const b = Math.sqrt(Math.pow(triangle.getX3() - triangle.getX2(), 2) + 
                          Math.pow(triangle.getY3() - triangle.getY2(), 2));
        const c = Math.sqrt(Math.pow(triangle.getX1() - triangle.getX3(), 2) + 
                          Math.pow(triangle.getY1() - triangle.getY3(), 2));
        const p = (a + b + c) / 2;
        const area = Math.sqrt(p * (p - a) * (p - b) * (p - c));
        this.totalArea += area;
        console.log(`Площадь треугольника: ${area.toFixed(2)}`);
    }

    getTotalArea(): number {
        return this.totalArea;
    }
} 