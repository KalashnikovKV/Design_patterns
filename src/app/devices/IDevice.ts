export interface IDevice {
    drawCircle(x: number, y: number, radius: number): void;
    drawRectangle(x: number, y: number, width: number, height: number): void;
    drawTriangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void;
} 