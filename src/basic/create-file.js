import { errorHandler } from '../helpers/errorHandler.js';
import fs from 'fs';
import { resolve } from 'path';

export const createFile = async (filename, currentDir) => {
  try {
    const currentPath = resolve(currentDir, filename.toString());
    
    const writableStream = fs.createWriteStream(currentPath);

    return new Promise((resolve, reject) => {
      writableStream.on('finish', () => {
        console.log(`The file has been created: ${currentPath}`);
        resolve();
      });

      writableStream.on('error', (error) => {
        reject(error);
      });

      writableStream.end();
    });
  } catch (error) {
    errorHandler(error);
  }
};
