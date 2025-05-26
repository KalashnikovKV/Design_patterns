import { IDevice } from './IDevice';

export class PrinterDevice implements IDevice {
    drawCircle(x: number, y: number, radius: number): void {
        console.log(`Печатаем круг: позиция (${x}, ${y}), радиус ${radius}`);
        // Здесь будет реальная логика печати
    }

    drawRectangle(x: number, y: number, width: number, height: number): void {
        console.log(`Печатаем прямоугольник: позиция (${x}, ${y}), размеры ${width}x${height}`);
    }

    drawTriangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void {
        console.log(`Печатаем треугольник: точки (${x1},${y1}), (${x2},${y2}), (${x3},${y3})`);
    }
} 