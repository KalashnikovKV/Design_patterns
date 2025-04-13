import { parseInputFile } from '../../src/utils/fileParser';
import { ShapeParser } from '../../src/parser/ShapeParser';
import { Pyramid } from '../../src/entities/Pyramid';
import { PyramidService } from '../../src/services/PyramidService';
import { PyramidValidator } from '../../src/validators/PyramidValidator';
import { Point } from '../../src/entities/Point';

describe('PyramidService from figures.txt', () => {
  const lines = parseInputFile('figures.txt');

  const pyramidLines = lines.filter((line) =>
    line.trim().toLowerCase().startsWith('pyramid')
  );

  it('should correctly parse, validate and calculate area and volume for pyramids', () => {
    pyramidLines.forEach((line, i) => {
      const shape = ShapeParser.parse(line);

      if (!shape) {
        expect(shape).toBeNull();
        return;
      }

      expect(shape).toBeInstanceOf(Pyramid);

      const isValid = PyramidValidator.isValid(shape as Pyramid);

      if (isValid) {
        const area = PyramidService.getArea(shape as Pyramid);
        const volume = PyramidService.getVolume(shape as Pyramid);

        expect(area).toBeGreaterThan(0);
        expect(volume).toBeGreaterThan(0);
      } else {
        expect(isValid).toBe(false);
      }
    });
  });

  it('should calculate volume ratio correctly when intersected by xy plane', () => {
    const pyramid = new Pyramid('p1', new Point(0, 0, 2), 4, 6);

    const ratio = PyramidService.getVolumeRatio(pyramid, 'xy');

    expect(ratio).toBeGreaterThan(0);
    expect(ratio).toBeLessThan(1);
  });

  it('should return 1 for volume ratio if no intersection with xy plane', () => {
    const pyramid = new Pyramid('p2', new Point(0, 0, 0), 4, 6);

    const ratio = PyramidService.getVolumeRatio(pyramid, 'xy');

    expect(ratio).toBe(1);
  });

  it('should detect intersection with axis correctly', () => {
    const pyramid = new Pyramid('p3', new Point(1, 2, 3), 4, 6);

    const intersects = PyramidService.intersectsAxis(pyramid, 2);

    expect(intersects).toBe(true);
  });

  it('should detect no intersection with axis when out of range', () => {
    const pyramid = new Pyramid('p4', new Point(5, 5, 5), 4, 6);

    const intersects = PyramidService.intersectsAxis(pyramid, 2);

    expect(intersects).toBe(false);
  });

  it('should calculate volume ratio correctly when intersected by yz plane', () => {
    const pyramid = new Pyramid('p1', new Point(2, 0, 0), 4, 6);
    const ratio = PyramidService.getVolumeRatio(pyramid, 'yz');
    expect(ratio).toBe(0);
  });

  it('should calculate volume ratio correctly when intersected by zx plane', () => {
    const pyramid = new Pyramid('p1', new Point(0, 2, 0), 4, 6);
    const ratio = PyramidService.getVolumeRatio(pyramid, 'zx');
    expect(ratio).toBe(0);
  });
});

describe('PyramidValidator', () => {
  it('should validate a valid pyramid', () => {
    const pyramid = new Pyramid('validPyramid', new Point(0, 0, 0), 4, 6);
    const isValid = PyramidValidator.isValid(pyramid);
    expect(isValid).toBe(true);
  });

  it('should invalidate a pyramid with non-positive base length', () => {
    const pyramid = new Pyramid('invalidPyramid', new Point(0, 0, 0), -4, 6);
    const isValid = PyramidValidator.isValid(pyramid);
    expect(isValid).toBe(false);
  });

  it('should invalidate a pyramid with non-positive height', () => {
    const pyramid = new Pyramid('invalidPyramid', new Point(0, 0, 0), 4, -6);
    const isValid = PyramidValidator.isValid(pyramid);
    expect(isValid).toBe(false);
  });
});

describe('PyramidService additional tests', () => {
  it('should return 0 for volume ratio if truncated height is zero or less', () => {
    const pyramid = new Pyramid('p1', new Point(0, 0, 6), 4, 6);
    const ratio = PyramidService.getVolumeRatio(pyramid, 'xy');
    expect(ratio).toBe(0);
  });

  it('should handle invalid input gracefully', () => {
    const invalidLine = 'pyramid «1.0 2.0 z 4.0»';
    const shape = ShapeParser.parse(invalidLine);
    expect(shape).toBeNull();
  });
});
