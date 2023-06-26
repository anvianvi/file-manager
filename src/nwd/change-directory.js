import { errorHandler } from '../helpers/errorHandler.js';
import fs from 'fs/promises';
import path from 'path';

export async function changeDirectory(currentDir, fileName) {
  try {
    const targetPath = fileName;

    if (targetPath === '..') {
      currentDir = path.dirname(currentDir);
    } else {
      const absoluteTargetPath = path.resolve(currentDir, targetPath);
      const stats = await fs.stat(absoluteTargetPath);

      if (stats.isDirectory()) {
        currentDir = absoluteTargetPath;
      } else {
        throw new Error(`${targetPath} is not a directory.`);
      }
    }
  } catch (error) {
    errorHandler(error);
  }

  return currentDir;
}
