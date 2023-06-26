import { errorHandler } from '../helpers/errorHandler.js';
import fs from 'fs/promises';
import path from 'path';

export async function changeDirectory(currentDir, args) {
  try {
    const targetPath = args[0];
    let absoluteTargetPath;

    if (targetPath === '..') {
      absoluteTargetPath = path.dirname(currentDir);
    } else if (path.isAbsolute(targetPath)) {
      absoluteTargetPath = path.resolve(targetPath);
    } else {
      absoluteTargetPath = path.resolve(currentDir, targetPath);
    }

    const stats = await fs.stat(absoluteTargetPath);
    if (stats.isDirectory()) {
      return absoluteTargetPath;
    } else {
      throw new Error(`${targetPath} is not a directory.`);
    }
  } catch (error) {
    errorHandler(error);
  }
}
