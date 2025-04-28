import { Shape } from '../entities/Shape';

export abstract class Creator {
  abstract factoryMethod(name: string, data: string): Shape | null;

  create(input: string): Shape | null {
    const match = input.trim().match(this.getPattern());
    if (!match) return null;

    const [_, type, rawData] = match;
    const name = `${type}_${Math.floor(Math.random() * 10000)}`;
    return this.factoryMethod(name, rawData.trim());
  }

  protected abstract getPattern(): RegExp;
}
