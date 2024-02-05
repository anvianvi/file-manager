import { errorHandler } from '../helpers/errorHandler.js';
import { createReadStream, createWriteStream } from 'fs';
import { access } from 'fs/promises';
import { basename, resolve } from 'path';

export const copyFile = async (args) => {
  try {
    const sourceFilePath = args[0]
    const destinationFolderPath = args[1]

    await access(sourceFilePath);

    const copyFileName = basename(sourceFilePath)
    const targetPath = resolve(destinationFolderPath, copyFileName)

    const readStream = createReadStream(sourceFilePath);
    const writeNewFileStream = createWriteStream(targetPath);

    readStream.pipe(writeNewFileStream);

    console.log(`Copy of file ${sourceFilePath} successfully created at ${targetPath}`);
  } catch (error) {
    errorHandler(error);
  }
};
