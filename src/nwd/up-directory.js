import { errorHandler } from '../helpers/errorHandler.js';
import fs from 'fs/promises';

export const listOfFiles = async (currentDir) => {
  try {
    const items = await fs.readdir(currentDir, { withFileTypes: true });

    const sortedList = items.map((item) => {
      const fileType = item.isFile() ? 'file' : 'directory';
      return { Name: item.name, Type: fileType };
    }).sort((a, b) => {
      if (a.Type === b.Type) {
        return a.Name.localeCompare(b.Name);
      } else if (a.Type === 'directory') {
        return -1;
      } else {
        return 1;
      }
    });

    console.table(sortedList);
  } catch (error) {
    errorHandler(error);
  }
};
