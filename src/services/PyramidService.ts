import { Pyramid } from '../entities/Pyramid';

export class PyramidService {
  static getArea(p: Pyramid): number {
    const baseArea = p.baseLength ** 2;

    const slantHeight = Math.sqrt((p.baseLength / 2) ** 2 + p.height ** 2);

    const lateralArea = 4 * ((p.baseLength * slantHeight) / 2);

    return baseArea + lateralArea;
  }

  static getVolume(p: Pyramid): number {
    return (1 / 3) * p.baseLength ** 2 * p.height;
  }

  static isBaseOnPlane(p: Pyramid): boolean {
    return p.baseCenter.z === 0;
  }

  static getVolumeRatio(p: Pyramid, plane: 'xy' | 'yz' | 'zx'): number {
    switch (plane) {
      case 'xy': {
        if (p.baseCenter.z <= 0) return 1;
        if (p.baseCenter.z >= p.height) return 0;

        const heightAbovePlane = p.height - p.baseCenter.z;
        return (heightAbovePlane / p.height) ** 3;
      }
      case 'yz':
      case 'zx': {
        const coord = plane === 'yz' ? p.baseCenter.x : p.baseCenter.y;
        const halfBase = p.baseLength / 2;

        if (Math.abs(coord) >= halfBase) {
          return coord > 0 ? 0.75 : 0.25;
        }

        return coord > 0 ? 0.75 : 0.25;
      }
    }
    return 1;
  }

  static intersectsAxis(p: Pyramid, distance: number): boolean {
    const { x, y, z } = p.baseCenter;
    return (
      Math.abs(x) <= distance ||
      Math.abs(y) <= distance ||
      Math.abs(z) <= distance
    );
  }
}
