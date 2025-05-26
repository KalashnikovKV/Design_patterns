import { ScreenDevice } from './devices/ScreenDevice';
import { PrinterDevice } from './devices/PrinterDevice';
import { Circle } from './shapes/Circle';
import { Rectangle } from './shapes/Rectangle';
import { Triangle } from './shapes/Triangle';
import { AreaVisitor } from './visitors/AreaVisitor';

const screen = new ScreenDevice();
const printer = new PrinterDevice();

const circle = new Circle(screen, 10, 10, 5);
const rectangle = new Rectangle(printer, 20, 20, 10, 15);
const triangle = new Triangle(screen, 0, 0, 10, 0, 5, 10);

console.log('Отрисовка фигур:');
circle.draw();
rectangle.draw();
triangle.draw();

console.log('\nВычисление площадей:');
const areaVisitor = new AreaVisitor();
circle.accept(areaVisitor);
rectangle.accept(areaVisitor);
triangle.accept(areaVisitor);

console.log(`\nОбщая площадь всех фигур: ${areaVisitor.getTotalArea().toFixed(2)}`);
