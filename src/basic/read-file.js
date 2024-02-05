import { errorHandler } from '../helpers/errorHandler.js';
import { createReadStream } from 'fs';
import path from 'path';

export const readFile = async (currentDir, args) => {
  try {
    return new Promise((resolve, reject) => {
      const fileToReadName = args[0]
      const pathToFileToRead = path.join(currentDir, fileToReadName);
      const readStream = createReadStream(pathToFileToRead);
      readStream.on("data", (chunk) => console.log(chunk.toString()));
      readStream.on("error", () => reject(new Error("read operation failed")));
      readStream.on("end", () => resolve());
    });
  } catch (error) {
    errorHandler(error);
  }
};