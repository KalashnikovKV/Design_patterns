import { PrinterDevice } from '../src/app/devices/PrinterDevice';
import { Rectangle } from '../src/app/shapes/Rectangle';
import { AreaVisitor } from '../src/app/visitors/AreaVisitor';

describe('Тесты Rectangle', () => {
    let printer: PrinterDevice;

    beforeEach(() => {
        printer = new PrinterDevice();
    });

    it('должен создать прямоугольник с правильными параметрами', () => {
        const rectangle = new Rectangle(printer, 20, 20, 10, 15);
        expect(rectangle).toBeDefined();
    });

    it('должен правильно вычислять площадь прямоугольника', () => {
        const rectangle = new Rectangle(printer, 20, 20, 10, 15);
        const areaVisitor = new AreaVisitor();
        rectangle.accept(areaVisitor);
        expect(areaVisitor.getTotalArea()).toBe(150);
    });
}); 