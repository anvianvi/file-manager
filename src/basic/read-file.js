import { errorHandler } from '../helpers/errorHandler.js';
import fs from 'fs';
import { resolve } from 'path';

export const readFile = async (filePath) => {
  try {
    const currentPath = resolve(filePath.toString());
    
    const readableStream = fs.createReadStream(currentPath, {
      encoding: 'utf8',
    });

    return new Promise((resolve, reject) => {
      let data = '';

      readableStream.on('data', (chunk) => {
        data += chunk;
      });

      readableStream.on('end', () => {
        console.log(data);
        resolve();
      });

      readableStream.on('error', (error) => {
        reject(error);
      });
    });
  } catch (error) {
    errorHandler(error);
  }
};
