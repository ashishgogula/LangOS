
async function loadDotenv() {
  try {
    const [{ default: dotenv }, fs, path] = await Promise.all([
      import("dotenv"),
      import("node:fs"),
      import("node:path"),
    ]);

    const dotenvPath = path.resolve(process.cwd(), ".env.local");
    if (fs.existsSync(dotenvPath)) {
      dotenv.config({ path: dotenvPath });
      return;
    }

    dotenv.config();
  } catch {
    // Ignore when dotenv is unavailable. Existing env vars are still used.
  }
}

async function main() {
  await loadDotenv();

  if (!process.env.LINGODOTDEV_API_KEY && process.env.LINGO_API_KEY) {
    process.env.LINGODOTDEV_API_KEY = process.env.LINGO_API_KEY;
  }

  if (!process.env.LINGO_API_KEY && process.env.LINGODOTDEV_API_KEY) {
    process.env.LINGO_API_KEY = process.env.LINGODOTDEV_API_KEY;
  }

  const { spawnSync } = await import("node:child_process");
  const command = process.platform === "win32" ? "npx.cmd" : "npx";
  const args = ["lingo.dev", "run", ...process.argv.slice(2)];

  const result = spawnSync(command, args, {
    env: process.env,
    stdio: "inherit",
  });

  if (result.error) {
    process.exit(1);
  }

  process.exit(result.status ?? 1);
}

main().catch(() => {
  process.exit(1);
});
