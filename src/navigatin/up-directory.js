import { errorHandler } from '../helpers/errorHandler.js';
import fs from 'fs/promises';
import path from 'path';

export async function upDirectory(currentDir) {
  try {
    const parentDir = path.dirname(currentDir);
    const stats = await fs.stat(parentDir);

    if (stats.isDirectory()) {
      return parentDir;
    }
  } catch (error) {
    errorHandler(error);
  }
}
