import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';

async function run() {
  const { stdout } = await promisify(exec)('npx figlet -f slant "EDUCATION"');
  fs.writeFileSync('output.txt', stdout, 'utf8');
}
run();
