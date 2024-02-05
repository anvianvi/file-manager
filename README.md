# file-manager

List of operations and their syntax:

Navigation & working directory:

- cd path_to_directory - Go to dedicated folder from current directory
- up - Go upper from current directory
- ls - Print in console list of all files and folders in current directory

Basic operations with files:

- cat file_name - Read file and print it's content in console
- add new_file_name - Create empty file in current working directory
- rm file_name - Delete file in current directory
- rn path_to_file new_filename - Rename file
  **Example:** rn C:\Users\User\test\test.txt newtest.txt
- cp path_to_file path_to_new_directory - Copy file
  **Example:** cp C:\Users\User\test\test.txt C:\Users\User\test\newfolder\
- mv path_to_file path_to_new_directory - Move file should be done using Readable and Writable streams
  **Example:** mv C:\Users\User\test\test.txt C:\Users\User\test\newfolder\

Operating system info (prints following information in console)

- os --EOL - Get EOL (default system End-Of-Line) and print it to console
- os --cpus - Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them) and print it to console
- os --homedir - Get home directory and print it to console
- os --username - Get current system user name (Do not confuse with the username that is set when the application starts) and print it to console
- os --architecture - Get CPU architecture for which Node.js binary has compiled and print it to console

Hash calculation

- hash path_to_file - Calculate hash for file and print it into console
  **Example:** hash C:\Users\User\test\test.txt

Compress and decompress operations

- compress path_to_file path_to_destination - Compress file (using Brotli algorithm)
  **Example:** compress C:\Users\User\test\test.txt C:\Users\User\test\newfolder\
- decompress path_to_file path_to_destination - Decompress file (using Brotli algorithm)
  **Example:** decompress C:\Users\User\test\newfolder\compressed-with-brotli-test.txt C:\Users\User\test\newfolder
