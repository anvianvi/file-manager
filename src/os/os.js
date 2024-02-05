import { errorHandler } from '../helpers/errorHandler.js';
import os from 'os';

export async function osHandler(args) {
  try {
    switch (args) {
      case '--EOL':
        printEndOfLine();
        break;
      case '--cpus':
        printCpuInfo();
        break;
      case '--homedir':
        printHomeDirectory();
        break;
      case '--username':
        printCurrentUsername();
        break;
      case '--architecture':
        printCpuArchitecture();
        break;
      default:
        console.log(`Need to provide args with 'os' command \n You can use --EOL, --cpus, --homedir, --username, --architecture`);
        break;
    }
  } catch (error) {
    errorHandler(error);
  }
}

function printEndOfLine() {
  console.log(`current End-Of-Line: ${JSON.stringify(os.EOL)} \n`);
}

function printCpuInfo() {
  const cpus = os.cpus().map((cpu) => ({
    Model: cpu.model,
    'Clock rate': `${(cpu.speed / 1000).toFixed(2)} GHz \n`,
  }));
  console.log(`CPUs count: ${cpus.length}`);
  console.table(cpus);
}

function printHomeDirectory() {
  const homeDir = os.homedir();
  console.log(`Home directory: ${homeDir} \n`);
}

function printCurrentUsername() {
  const username = os.userInfo().username;
  console.log(`Current user name: ${username} \n`);
}

function printCpuArchitecture() {
  const architecture = os.arch();
  console.log(`CPU architecture: ${architecture} \n`);
}
