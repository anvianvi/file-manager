import readline from 'readline';
import os from 'os';
import { promisify } from 'util';

import { errorHandler } from '../helpers/errorHandler.js';
import { changeDirectory } from '../navigatin/change-directory.js';
import { upDirectory } from '../navigatin/up-directory.js';
import { listOfFiles } from '../navigatin/list-of-files.js';
import { readFile } from '../basic/read-file.js';
import { createFile } from '../basic/create-file.js';
import { renameFile } from '../basic/rename-file.js';
import { copyFile } from '../basic/copy-file.js';
import { moveFile } from '../basic/move-file.js';
import { removeFile } from '../basic/delete-file.js';
import { osHandler } from '../os/os.js';
import { hashCalculator } from '../hash/hash.js';
import { compressFile } from '../zip/compress.js';
import { decompressFile } from '../zip/decompress.js';

const { createInterface } = readline;
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const username = process.argv[2]?.replace('--username=', '') || 'default';

const question = promisify(rl.question).bind(rl);

const askUserInput = async (prompt) => await question(prompt);

const handleSIGINT = () => {
  console.log(
    `\n *********************************************************
     \n Thank you for using File Manager, ${username}, goodbye!
     \n *********************************************************
     \n`,
  );
  rl.close();
  process.exit();
};

rl.on('SIGINT', handleSIGINT);

async function core() {
  const homedir = os.homedir();

  let currentDir = homedir;
  console.log(`Welcome to the File Manager, ${username}!`);
  console.log(`You are currently in ${currentDir}`);

  while (true) {
    try {
      const input = await askUserInput(`>>> `);
      const [commandName, ...args] = input.split(' ');

      switch (commandName) {
        case 'cd':
          currentDir = await changeDirectory(currentDir, args[0]);
          break;
        case 'up':
          if (args.length === 0) {
            const newDir = await upDirectory(currentDir);
            if (newDir) {
              currentDir = newDir;
            }
          } else {
            throw new Error();
          }
          break;
        case 'ls':
          await listOfFiles(currentDir);
          break;
        case 'cat':
          await readFile(currentDir, args);
          break;
        case 'add':
          await createFile(currentDir, args);
          break;
        case 'rn':
          await renameFile(currentDir, args);
          break;
        case 'cp':
          await copyFile(args);
          break;
        case 'mv':
          await moveFile(args);
          break;
        case 'rm':
          await removeFile(currentDir, args);
          break;
        case 'os':
          await osHandler(...args);
          break;
        case 'hash':
          await hashCalculator(...args);
          break;
        case 'compress':
          await compressFile(args);
          break;
        case 'decompress':
          await decompressFile(args);
          break;
        case 'exit':
          console.log(`Thank you for using File Manager, ${username}, goodbye!`);
          rl.close();
          return;
        default:
          console.log(`Invalid input`);
          break;
      }

      console.log(`You are currently in ${currentDir}`);
    } catch (error) {
      errorHandler(error);
    }
  }
}

export { core };
