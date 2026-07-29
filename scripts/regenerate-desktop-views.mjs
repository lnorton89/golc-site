import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const siteDirectory = path.resolve(scriptDirectory, "..");
const frontendDirectory = path.resolve(siteDirectory, "..", "frontend");
const requiredParentFiles = [
  "package.json",
  path.join("src", "shell", "desktopViews.json"),
  path.join("e2e", "desktop-view-docs.spec.ts"),
];
const missingParentFiles = requiredParentFiles.filter(
  (relativePath) => !existsSync(path.join(frontendDirectory, relativePath)),
);

if (missingParentFiles.length > 0) {
  console.error(
    `GOLC_DESKTOP_VIEWS_PARENT_MISSING: expected parent frontend checkout at "${frontendDirectory}" ` +
      `(missing: ${missingParentFiles.join(", ")})`,
  );
  process.exit(1);
}

const npmExecPath = process.env.npm_execpath;
if (!npmExecPath) {
  throw new Error(
    "GOLC_DESKTOP_VIEWS_NPM_EXEC_PATH_MISSING: run this wrapper through npm run docs:screenshots",
  );
}

const result = spawnSync(
  process.execPath,
  [npmExecPath, "run", "docs:screenshots"],
  {
    cwd: frontendDirectory,
    env: { ...process.env, CI: "1" },
    shell: false,
    stdio: "inherit",
  },
);

if (result.error) {
  throw result.error;
}
if (result.signal) {
  process.kill(process.pid, result.signal);
}
process.exit(result.status ?? 1);
