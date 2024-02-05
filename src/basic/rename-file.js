import { errorHandler } from '../helpers/errorHandler.js';
import fs from 'fs';
import { resolve } from 'path';

export const renameFile = async (pathToFile, newFilename) => {
  try {
    const resolvedPathToFile = resolve(pathToFile);
    const resolvedNewFilename = resolve(newFilename);

    await fs.promises.rename(resolvedPathToFile, resolvedNewFilename);
    console.log('The file was renamed successfully.');
  } catch (error) {
    errorHandler(error);
  }
};
