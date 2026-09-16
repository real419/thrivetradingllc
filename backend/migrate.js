const { execSync } = require('child_process');
const path = require('path');

const prismaBin = path.join(__dirname, 'node_modules', 'prisma', 'build', 'index.js');

try {
  console.log('Running Prisma migration...');
  execSync(`node "${prismaBin}" migrate dev --name init`, { stdio: 'inherit' });
} catch (error) {
  console.error('Migration failed:', error.message);
}