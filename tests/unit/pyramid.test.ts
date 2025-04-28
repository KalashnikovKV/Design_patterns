import { parseInputFile } from '../../src/utils/fileParser';
import { ShapeParser } from '../../src/parser/ShapeParser';
import { Pyramid } from '../../src/entities/Pyramid';
import { PyramidService } from '../../src/services/PyramidService';
import { PyramidValidator } from '../../src/validators/PyramidValidator';
import { Point3D } from '../../src/entities/points/Point3D';

describe('PyramidService from figures.txt', () => {
  const lines = parseInputFile('figures.txt');

  const pyramidLines = lines.filter((line) =>
    line.trim().toLowerCase().startsWith('pyramid')
  );

  it('should correctly parse, validate and calculate area and volume for pyramids', () => {
    pyramidLines.forEach((line) => {
      const shape = ShapeParser.parse(line);

      if (!shape) {
        expect(shape).toBeNull();
        return;
      }

      expect(shape).toBeInstanceOf(Pyramid);

      const isValid = PyramidValidator.isValid(shape as Pyramid);

      if (isValid) {
        const service = new PyramidService(shape as Pyramid);
        const area = service.getArea();
        const volume = service.getVolume();

        expect(area).toBeGreaterThan(0);
        expect(volume).toBeGreaterThan(0);
      } else {
        expect(isValid).toBe(false);
      }
    });
  });

  describe('Volume ratio calculations', () => {
    it('should return correct ratio when intersected by xy plane', () => {
      const pyramid = new Pyramid('p1', new Point3D(0, 0, 2), 4, 6);
      const service = new PyramidService(pyramid);

      const ratio = service.getVolumeRatio('xy');

      expect(ratio).toBeGreaterThan(0);
      expect(ratio).toBeLessThan(1);
    });

    it('should return 1 when no intersection with xy plane', () => {
      const pyramid = new Pyramid('p2', new Point3D(0, 0, -2), 4, 6);
      const service = new PyramidService(pyramid);

      const ratio = service.getVolumeRatio('xy');

      expect(ratio).toBe(1);
    });

    it('should return 0 when pyramid is fully above xy plane', () => {
      const pyramid = new Pyramid('p3', new Point3D(0, 0, 8), 4, 6);
      const service = new PyramidService(pyramid);

      const ratio = service.getVolumeRatio('xy');

      expect(ratio).toBe(0);
    });

    it('should calculate volume ratio correctly when intersected by yz plane', () => {
      const pyramid = new Pyramid('p4', new Point3D(2, 0, 0), 4, 6);
      const service = new PyramidService(pyramid);

      const ratio = service.getVolumeRatio('yz');

      expect(ratio).toBe(0.75);
    });

    it('should calculate volume ratio correctly when intersected by zx plane', () => {
      const pyramid = new Pyramid('p5', new Point3D(0, 2, 0), 4, 6);
      const service = new PyramidService(pyramid);

      const ratio = service.getVolumeRatio('zx');

      expect(ratio).toBe(0.75);
    });
  });
});

describe('PyramidValidator', () => {
  it('should validate a valid pyramid', () => {
    const pyramid = new Pyramid('validPyramid', new Point3D(0, 0, 0), 4, 6);

    const isValid = PyramidValidator.isValid(pyramid);

    expect(isValid).toBe(true);
  });

  it('should invalidate a pyramid with non-positive base length', () => {
    const pyramid = new Pyramid('invalidPyramid', new Point3D(0, 0, 0), -4, 6);

    const isValid = PyramidValidator.isValid(pyramid);

    expect(isValid).toBe(false);
  });

  it('should invalidate a pyramid with non-positive height', () => {
    const pyramid = new Pyramid('invalidPyramid', new Point3D(0, 0, 0), 4, -6);

    const isValid = PyramidValidator.isValid(pyramid);

    expect(isValid).toBe(false);
  });
});

describe('PyramidService additional tests', () => {
  it('should calculate correct area and volume for a simple pyramid', () => {
    const pyramid = new Pyramid('p1', new Point3D(0, 0, 0), 4, 6);
    const service = new PyramidService(pyramid);

    const area = service.getArea();
    const volume = service.getVolume();

    expect(area).toBeCloseTo(66.6, 1);
    expect(volume).toBe(32);
  });

  it('should detect if base is on coordinate plane', () => {
    const pyramid1 = new Pyramid('p1', new Point3D(0, 0, 0), 4, 6);
    const pyramid2 = new Pyramid('p2', new Point3D(0, 0, 2), 4, 6);
    const service1 = new PyramidService(pyramid1);
    const service2 = new PyramidService(pyramid2);

    const isOnPlane1 = service1.isBaseOnPlane();
    const isOnPlane2 = service2.isBaseOnPlane();

    expect(isOnPlane1).toBe(true);
    expect(isOnPlane2).toBe(false);
  });
});
