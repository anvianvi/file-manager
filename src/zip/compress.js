import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import { basename, resolve } from 'path';
import { pipeline } from 'stream/promises';
import { errorHandler } from '../helpers/errorHandler.js';

export const compressFile = async (args) => {
  try {
    const pathToFile = args[0]
    const pathToDestination = args[1]

    const outputPath = resolve(pathToDestination, `compressed-with-brotli-${basename(pathToFile)}`);

    const readStream = createReadStream(pathToFile);
    const writeStream = createWriteStream(outputPath);
    const gzipStream = createBrotliCompress();

    await pipeline(readStream, gzipStream, writeStream)

    console.log(`File compressed to ${outputPath}`);
  } catch (error) {
    errorHandler(error);
  }
};
