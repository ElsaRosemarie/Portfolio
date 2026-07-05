import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const env = { ...process.env, NEXT_PUBLIC_BASE_PATH: "" };

console.log("Building for local hosting (no base path)...");

const build = spawnSync("npm", ["run", "build"], {
  cwd: ROOT,
  env,
  stdio: "inherit",
  shell: true,
});

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

console.log("Starting local server at http://localhost:3000");

spawnSync("npx", ["--yes", "serve", "out", "-l", "3000"], {
  cwd: ROOT,
  stdio: "inherit",
  shell: true,
});
