import { errorHandler } from '../helpers/errorHandler.js';
import fs from 'fs/promises';

export const removeFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
    console.log(`The file has been deleted: ${filePath}`);
  } catch (error) {
    errorHandler(error);
  }
};
