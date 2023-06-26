import { errorHandler } from './errorHandler.js';
import fs from 'fs/promises';
import { createHash } from 'crypto';

export const hashCalculator = async (path) => {
  try {
    const message = await fs.readFile(path, 'utf8');

    const hash = createHash('sha256').update(message).digest('hex');

    console.log(hash);
  } catch (error) {
    errorHandler(error);
  }
};
