import { createReadStream, createWriteStream } from 'fs';
import { createBrotliDecompress } from 'zlib';
import { basename, resolve } from 'path';
import { pipeline } from 'stream/promises';
import { errorHandler } from '../helpers/errorHandler.js';

export const decompressFile = async (args) => {
  try {
    const pathToFile = args[0]
    const pathToDestination = args[1]

    const outputPath = resolve(pathToDestination, `decompresed-with-brotli-${basename(pathToFile)}`);

    const readStream = createReadStream(pathToFile);
    const writeStream = createWriteStream(outputPath);
    const unzipStream = createBrotliDecompress();

    await pipeline(readStream, unzipStream, writeStream);

    console.log(`File decompressed to "${pathToDestination}"`);
  } catch (error) {
    errorHandler(error);
  }
};
