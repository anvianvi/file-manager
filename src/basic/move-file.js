import { basename, resolve } from 'path';
import { errorHandler } from '../helpers/errorHandler.js';
import { access, unlink } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';

export const moveFile = async (args) => {
  try {
    const sourceFilePath = args[0]
    const destinationFolderPath = args[1]

    await access(sourceFilePath);

    const targetPath = resolve(destinationFolderPath, basename(sourceFilePath));

    const readStream = createReadStream(sourceFilePath);
    const writeNewFileStream = createWriteStream(targetPath);

    readStream.pipe(writeNewFileStream);

    await new Promise((resolve) => {
      writeNewFileStream.on('close', resolve);
    });

    await unlink(sourceFilePath);

    console.log(`File ${sourceFilePath} successfully muved to ${destinationFolderPath}`);

  } catch (error) {
    errorHandler(error);
  }
};
