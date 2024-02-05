import { errorHandler } from '../helpers/errorHandler.js';
import { readFile } from 'fs/promises';
import { createHash } from 'crypto';

export const hashCalculator = async (args) => {
  try {
    const pathToFile = args[0]
    const message = await readFile(pathToFile, 'utf8');

    const hash = createHash('sha256').update(message).digest('hex');

    console.log(`file hash equal to: \n ${hash}`);

  } catch (error) {
    errorHandler(error);
  }
};
