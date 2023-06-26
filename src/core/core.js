import readline from 'readline';
import os from 'os';
import { promisify } from 'util';

import { errorHandler } from '../helpers/errorHandler.js';
import { changeDirectory } from '../nwd/change-directory.js';
import { upDirectory } from '../nwd/up-directory.js';
import { listOfFiles } from '../nwd/list-of-files.js';
import { readFile } from '../basic/read-file.js';
import { createFile } from '../basic/create-file.js';
import { renameFile } from '../basic/rename-file.js';
import { copyFile } from '../basic/copy-file.js';
import { moveFile } from '../basic/move-file.js';
import { removeFile } from '../basic/delete-file.js';
import { osHandler } from '../helpers/os.js';
import { hashCalculator } from '../helpers/hash.js'
import { compressFile } from '../zip/compress.js';
import { decompressFile } from '../zip/decompress.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const username = process.argv[2].replace('--username=', '');

const question = promisify(rl.question).bind(rl);

async function askUserInput(prompt) {
  return await question(prompt);
}

async function core() {
  const homedir = os.homedir();

  let currentDir = homedir;
  console.log(`Welcome to the File Manager, ${username}!`);
  console.log(`You are currently in ${currentDir}`);

  rl.on('SIGINT', () => {
    console.log(
      `\n *********************************************************
       \n Thank you for using File Manager, ${username}, goodbye!
       \n *********************************************************
       \n`,
    );
    rl.close();
    process.exit();
  });

  while (true) {
    try {
      const input = await askUserInput(`>>> `);
      const [commandName, ...args] = input.split(' ');
      switch (commandName) {
        case 'cd':
          try {
            const fileName = args[0];
            currentDir = await changeDirectory(currentDir, fileName);
          } catch (error) {
            errorHandler(error);
          }
          break;
        case 'up':
          try {
            if (!!args.length) {
              throw new Error();
            }
            const newDir = await upDirectory(currentDir);
            if (newDir) {
              currentDir = newDir;
            }
          } catch (error) {
            errorHandler(error);
          }
          break;
        case 'ls':
          try {
            await listOfFiles(currentDir);
          } catch (error) {
            errorHandler(error);
          }
          break;
        case 'cat':
          try {
            await readFile(args);
          } catch (error) {
            errorHandler(error);
          }
          break;
        case 'add':
          try {
            await createFile(args, currentDir);
          } catch (error) {
            errorHandler(error);
          }
          break;
        case 'rn':
          try {
            await renameFile(args);
          } catch (error) {
            errorHandler(error);
          }
          break;
        case 'cp':
          try {
            await copyFile(args);
          } catch (error) {
            errorHandler(error);
          }
          break;
        case 'mv':
          try {
            await moveFile(args);
          } catch (error) {
            errorHandler(error);
          }
          break;
        case 'rm':
          try {
            await removeFile(...args);
          } catch (error) {
            errorHandler(error);
          }
          break;
        case 'os':
          try {
            await osHandler(...args);
          } catch (error) {
            errorHandler(error);
          }
          break;
        case 'hash':
          try {
            await hashCalculator(...args);
          } catch (error) {
            errorHandler(error);
          }
          break;
        case 'compress':
          try {
            await compressFile(args);
          } catch (error) {
            errorHandler(error);
          }
          break;
        case 'decompress':
          try {
            await decompressFile(args);
          } catch (error) {
            errorHandler(error);
          }
          break;
        case 'exit':
          console.log(
            `Thank you for using File Manager, ${username}, goodbye!`,
          );
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

export default core;
