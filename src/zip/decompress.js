import fs from 'fs';
import zlib from 'zlib';
import path, { resolve } from 'path';
import { pipeline } from 'stream/promises';
import { errorHandler } from '../helpers/errorHandler.js';

export const decompressFile = async (pathToFile, pathToDestination) => {
  try {
    const resolvedPathToFile = resolve(pathToFile);
    const resolvedPathToDestination = resolve(pathToDestination);
    const newFileName = path.basename(resolvedPathToFile, '.br');
    const pathNewFile = resolve(resolvedPathToDestination, newFileName);

    const inputStream = fs.createReadStream(resolvedPathToFile);
    const brotliStream = zlib.createBrotliDecompress();
    const outputStream = fs.createWriteStream(pathNewFile);

    await pipeline(inputStream, brotliStream, outputStream);

    console.log(`File decompressed to "${pathNewFile}"`);
  } catch (error) {
    errorHandler(error);
  }
};
