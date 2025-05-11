import { Pyramid } from '../entities/Pyramid';

export class PyramidService {
  constructor(private readonly pyramid: Pyramid) {}

  getArea(): number {
    if (!this.pyramid || !this.pyramid.baseCenter || !this.pyramid.baseLength || !this.pyramid.height) {
      return 0;
    }
    const baseArea = this.pyramid.baseLength * this.pyramid.baseLength;
    const lateralArea = 2 * this.pyramid.baseLength * Math.sqrt(
      Math.pow(this.pyramid.height, 2) + Math.pow(this.pyramid.baseLength / 2, 2)
    );
    return baseArea + lateralArea;
  }

  getVolume(): number {
    if (!this.pyramid || !this.pyramid.baseLength || !this.pyramid.height) {
      return 0;
    }
    const baseArea = this.pyramid.baseLength * this.pyramid.baseLength;
    return (baseArea * this.pyramid.height) / 3;
  }

  isBaseOnPlane(): boolean {
    return this.pyramid.baseCenter.z === 0;
  }

  getVolumeRatio(plane: 'xy' | 'yz' | 'zx'): number {
    switch (plane) {
      case 'xy': {
        if (this.pyramid.baseCenter.z <= 0) return 1;
        if (this.pyramid.baseCenter.z >= this.pyramid.height) return 0;

        const heightAbovePlane =
          this.pyramid.height - this.pyramid.baseCenter.z;
        return (heightAbovePlane / this.pyramid.height) ** 3;
      }
      case 'yz':
      case 'zx': {
        const coord =
          plane === 'yz'
            ? this.pyramid.baseCenter.x
            : this.pyramid.baseCenter.y;
        const halfBase = this.pyramid.baseLength / 2;

        if (Math.abs(coord) >= halfBase) {
          return coord > 0 ? 0.75 : 0.25;
        }

        return coord > 0 ? 0.75 : 0.25;
      }
    }
    return 1;
  }

  intersectsAxis(distance: number): boolean {
    const { x, y, z } = this.pyramid.baseCenter;
    return (
      Math.abs(x) <= distance ||
      Math.abs(y) <= distance ||
      Math.abs(z) <= distance
    );
  }
}
