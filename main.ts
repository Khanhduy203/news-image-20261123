import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
// Treat an empty or whitespace-only MAKEFUN_OUTPUT_DIR as unset.
const rawOutDir = process.env.MAKEFUN_OUTPUT_DIR;
const outDir = rawOutDir && rawOutDir.trim() !== "" ? rawOutDir : ".";
mkdirSync(outDir, { recursive: true });
const dest = join(outDir, "entry.png");
copyFileSync(source, dest);
// Verify the copy is complete before exiting.
const sourceSize = statSync(source).size;
const destSize = statSync(dest).size;
if (destSize !== sourceSize) {
  throw new Error(`entry.png copy incomplete: ${destSize} of ${sourceSize} bytes`);
}
