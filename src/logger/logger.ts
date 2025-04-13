import pino from 'pino';
import fs from 'fs';
import path from 'path';

const logDir = path.resolve(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

export const logger = pino({
  transport: {
    targets: [
      { target: 'pino-pretty', options: { colorize: true } },
      { target: 'pino/file', options: { destination: 'logs/app.log' } },
      {
        target: 'pino/file',
        options: { destination: 'logs/errors.log', level: 'error' },
      },
    ],
  },
});
