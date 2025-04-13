import { Pyramid } from '../entities/Pyramid';

export class PyramidService {
  static getArea(p: Pyramid): number {
    const baseArea = p.baseLength ** 2;
    const slantHeight = Math.sqrt((p.baseLength / 2) ** 2 + p.height ** 2);
    const lateralArea = 2 * p.baseLength * slantHeight;
    return baseArea + lateralArea;
  }

  static getVolume(p: Pyramid): number {
    return (1 / 3) * p.baseLength ** 2 * p.height;
  }

  static isBaseOnPlane(p: Pyramid): boolean {
    return p.baseCenter.z === 0;
  }

  static getVolumeRatio(p: Pyramid, plane: 'xy' | 'yz' | 'zx'): number {
    if (plane === 'xy' && p.baseCenter.z > 0) {
      const truncatedHeight = p.height - p.baseCenter.z;
      if (truncatedHeight <= 0) return 0;
      const truncatedVolume = (1 / 3) * p.baseLength ** 2 * truncatedHeight;
      return truncatedVolume / this.getVolume(p);
    }
    if (plane === 'yz' && p.baseCenter.x > 0) {
      return 0;
    }
    if (plane === 'zx' && p.baseCenter.y > 0) {
      return 0;
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
