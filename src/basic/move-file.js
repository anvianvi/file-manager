import { errorHandler } from '../helpers/errorHandler.js';
import fs from 'fs';
import path, { resolve as resolvePath } from 'path';

export const moveFile = async (sourceFilePath, destinationFilePath) => {
  try {
    if (!destinationFilePath) {
      throw new Error('Destination file path is required.');
    }

    const sourcePath = resolvePath(sourceFilePath);
    const destinationPath = resolvePath(destinationFilePath, path.basename(sourceFilePath));

    const readableStream = fs.createReadStream(sourcePath);
    const writableStream = fs.createWriteStream(destinationPath);

    return new Promise((resolve, reject) => {
      readableStream.pipe(writableStream);

      writableStream.on('finish', async () => {
        await fs.promises.unlink(sourcePath);
        console.log(`The file has been moved to ${destinationPath}`);
        resolve();
      });

      readableStream.on('error', (error) => {
        reject(error);
      });

      writableStream.on('error', (error) => {
        reject(error);
      });
    });
  } catch (error) {
    errorHandler(error);
  }
};
