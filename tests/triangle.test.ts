import { ScreenDevice } from '../src/app/devices/ScreenDevice';
import { Triangle } from '../src/app/shapes/Triangle';
import { AreaVisitor } from '../src/app/visitors/AreaVisitor';

describe('Тесты Triangle', () => {
    let screen: ScreenDevice;

    beforeEach(() => {
        screen = new ScreenDevice();
    });

    it('должен создать треугольник с правильными параметрами', () => {
        const triangle = new Triangle(screen, 0, 0, 10, 0, 5, 10);
        expect(triangle).toBeDefined();
    });

    it('должен правильно вычислять площадь треугольника', () => {
        const triangle = new Triangle(screen, 0, 0, 10, 0, 5, 10);
        const areaVisitor = new AreaVisitor();
        triangle.accept(areaVisitor);
        expect(areaVisitor.getTotalArea()).toBeCloseTo(50, 2);
    });
}); 