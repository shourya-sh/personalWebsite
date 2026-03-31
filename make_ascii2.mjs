import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';

async function run() {
  const { stdout } = await promisify(exec)('npx figlet -w 200 -f slant "Shourya\'s Terminal"');
  fs.writeFileSync('output_horizontal.txt', stdout, 'utf8');
}
run();
