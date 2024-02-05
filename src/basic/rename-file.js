import { errorHandler } from '../helpers/errorHandler.js';
import { rename } from 'fs/promises';
import { resolve } from 'path';

export const renameFile = async (pathToFile, newFilename) => {
  try {
    const resolvedPathToFile = resolve(pathToFile);
    const resolvedNewFilename = resolve(newFilename);

    await rename(resolvedPathToFile, resolvedNewFilename);
    console.log('The file was renamed successfully.');
  } catch (error) {
    errorHandler(error);
  }
};
