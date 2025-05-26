import { ScreenDevice } from '../src/app/devices/ScreenDevice';
import { PrinterDevice } from '../src/app/devices/PrinterDevice';
import { Circle } from '../src/app/shapes/Circle';
import { Rectangle } from '../src/app/shapes/Rectangle';
import { Triangle } from '../src/app/shapes/Triangle';
import { AreaVisitor } from '../src/app/visitors/AreaVisitor';

describe('Тесты AreaVisitor', () => {
    let screen: ScreenDevice;
    let printer: PrinterDevice;

    beforeEach(() => {
        screen = new ScreenDevice();
        printer = new PrinterDevice();
    });

    it('должен правильно суммировать площади всех фигур', () => {
        const circle = new Circle(screen, 10, 10, 5);
        const rectangle = new Rectangle(printer, 20, 20, 10, 15);
        const triangle = new Triangle(screen, 0, 0, 10, 0, 5, 10);
        
        const areaVisitor = new AreaVisitor();
        circle.accept(areaVisitor);
        rectangle.accept(areaVisitor);
        triangle.accept(areaVisitor);

        const expectedTotal = Math.PI * 25 + 150 + 50;
        expect(areaVisitor.getTotalArea()).toBeCloseTo(expectedTotal, 2);
    });
}); 