const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Try to load dotenv if available
try {
  // Check if dotenv is resolvable
  require.resolve('dotenv');
  const dotenv = require('dotenv');
  
  const dotenvPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(dotenvPath)) {
    dotenv.config({ path: dotenvPath });
  } else {
    // Fallback to .env if .env.local doesn't exist
    dotenv.config();
  }
} catch (e) {
  // Ignore if dotenv is not available, we rely on existing env vars
}

// Map LINGO_API_KEY to LINGODOTDEV_API_KEY if needed
if (!process.env.LINGODOTDEV_API_KEY && process.env.LINGO_API_KEY) {
  process.env.LINGODOTDEV_API_KEY = process.env.LINGO_API_KEY;
}

try {
  // Pass all arguments to lingo.dev
  const args = process.argv.slice(2).join(' ');
  // Use shell: true to handle environment variables if needed
  execSync(`npx lingo.dev run ${args}`, { stdio: 'inherit', shell: true });
} catch (error) {
  process.exit(1);
}
