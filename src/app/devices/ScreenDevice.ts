import { IDevice } from './IDevice';

export class ScreenDevice implements IDevice {
    drawCircle(x: number, y: number, radius: number): void {
        console.log(`Рисуем круг на экране: позиция (${x}, ${y}), радиус ${radius}`);
        // Здесь будет реальная логика отрисовки на экране
    }

    drawRectangle(x: number, y: number, width: number, height: number): void {
        console.log(`Рисуем прямоугольник на экране: позиция (${x}, ${y}), размеры ${width}x${height}`);
    }

    drawTriangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void {
        console.log(`Рисуем треугольник на экране: точки (${x1},${y1}), (${x2},${y2}), (${x3},${y3})`);
    }
} 