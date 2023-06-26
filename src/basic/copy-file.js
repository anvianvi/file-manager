import { errorHandler } from '../helpers/errorHandler.js';
import fs from 'fs';
import path from 'path';

export const copyFile = async (sourceFilePath, destinationFolderPath) => {
  try {
    if (!destinationFolderPath) {
      throw new Error();
    }

    const fileName = path.basename(sourceFilePath);
    const destinationFilePath = path.resolve(destinationFolderPath, fileName);

    const readableStream = fs.createReadStream(sourceFilePath, { encoding: 'utf-8' });
    const writableStream = fs.createWriteStream(destinationFilePath);

    return new Promise((resolve, reject) => {
      readableStream.on('error', (error) => {
        reject(error);
      });

      writableStream.on('error', (error) => {
        reject(error);
      });

      writableStream.on('finish', () => {
        console.log(`File copied to ${destinationFolderPath}`);
        resolve();
      });

      readableStream.pipe(writableStream);
    });
  } catch (error) {
    errorHandler(error);
  }
};
