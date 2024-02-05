import path from 'path';
import { errorHandler } from '../helpers/errorHandler.js';
import { writeFile } from 'fs/promises';

export const createFile = async (currentDir, args) => {
  try {
    const newFileName = args[0]
    const pathToFile = path.join(currentDir, newFileName);
    await writeFile(pathToFile, '', { flag: 'wx' });
    console.log(`File with name - ${newFileName} created`)

  } catch (error) {
    errorHandler(error);
  }
};
