import fs from 'fs';
import path from 'path';
import { logger } from '../logger/logger';

export const parseInputFile = (filename: string): string[] => {
  const fullPath = path.resolve(__dirname, '../../input', filename);
  try {
    const content = fs.readFileSync(fullPath, 'utf-8');
    return content.trim().split('\n');
  } catch (e) {
    logger.error(`Ошибка при чтении файла: ${(e as Error).message}`);
    return [];
  }
};
