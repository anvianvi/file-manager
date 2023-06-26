import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import { pipeline } from 'stream/promises';
import { errorHandler } from '../helpers/errorHandler.js';

export const compressFile = async (pathToFile, pathToDestination) => {
  try {
    const resolvedPathToFile = path.resolve(pathToFile);
    const resolvedPathToDestination = path.resolve(pathToDestination);
    const outputPath = `${resolvedPathToDestination}/${path.basename(
      resolvedPathToFile
    )}.br`;

    const readStream = fs.createReadStream(resolvedPathToFile, {
      encoding: 'utf8'
    });
    const writeStream = fs.createWriteStream(outputPath);

    const brotliStream = zlib.createBrotliCompress();

    await pipeline(readStream, brotliStream, writeStream);

    console.log(`File compressed to ${outputPath}`);
  } catch (error) {
    errorHandler(error);
  }
};
