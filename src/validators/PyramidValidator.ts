import { Pyramid } from '../entities/Pyramid';

export class PyramidValidator {
  static isValid(pyramid: Pyramid): boolean {
    return pyramid.baseLength > 0 && pyramid.height > 0;
  }
}
