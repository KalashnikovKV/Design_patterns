import { ScreenDevice } from '../src/app/devices/ScreenDevice';
import { Circle } from '../src/app/shapes/Circle';
import { AreaVisitor } from '../src/app/visitors/AreaVisitor';

describe('Тесты Circle', () => {
    let screen: ScreenDevice;

    beforeEach(() => {
        screen = new ScreenDevice();
    });

    it('должен создать круг с правильными параметрами', () => {
        const circle = new Circle(screen, 10, 10, 5);
        expect(circle).toBeDefined();
    });

    it('должен правильно вычислять площадь круга', () => {
        const circle = new Circle(screen, 10, 10, 5);
        const areaVisitor = new AreaVisitor();
        circle.accept(areaVisitor);
        expect(areaVisitor.getTotalArea()).toBeCloseTo(Math.PI * 25, 2);
    });
}); 