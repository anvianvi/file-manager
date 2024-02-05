import path from 'path';
import { errorHandler } from '../helpers/errorHandler.js';
import fs from 'fs';

export const renameFile = async (currentDir, args) => {
  try {
    const oldFileNamePath = args[0]
    const newFileNamePath = path.join(currentDir, args[1]);

    await fs.promises.rename(oldFileNamePath, newFileNamePath);
    console.log('The file was renamed successfully.');
  } catch (error) {
    errorHandler(error);
  }
};
