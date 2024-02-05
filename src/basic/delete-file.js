import path from 'path';
import { errorHandler } from '../helpers/errorHandler.js';
import fs from 'fs/promises';

export const removeFile = async (currentDir, args) => {
  try {
    const fileToDeliteName = args[0]
    const pathToFileToDelite = path.join(currentDir, fileToDeliteName);
    await fs.unlink(pathToFileToDelite);
    console.log(`The file ${fileToDeliteName} has been deleted`);
  } catch (error) {
    errorHandler(error);
  }
};
