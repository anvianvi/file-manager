import { errorHandler } from '../helpers/errorHandler.js';
import fs from 'fs/promises';

export const listOfFiles = async (currentDir) => {
  try {
    let files = [];

    const items = await fs.readdir(currentDir, { withFileTypes: true });
    items.forEach((item) => {
      if (item.isFile()) {
        files.push({ Name: item.name, Type: 'file' });
      } else {
        files.push({ Name: item.name, Type: 'directory' });
      }
    });

    const sortedList = files.sort((a, b) => {
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
