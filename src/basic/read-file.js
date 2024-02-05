import { errorHandler } from '../helpers/errorHandler.js';
import { createReadStream } from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';

export const readFile = async (currentDir, fileToReadName) => {
  try {
    const pathToFileToRead = path.join(currentDir, fileToReadName);

    const readableStream = createReadStream(pathToFileToRead, {
      encoding: 'utf8',
    });

    await pipeline(
      readableStream,
      process.stdout)

  } catch (error) {
    errorHandler(error);
  }
};
