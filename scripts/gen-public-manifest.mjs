// Lists every file under /public into lib/public-files.generated.json.
// lib/public-image.ts uses it so the site never requests an image that isn't
// actually deployed (no 404s, no broken og:image). Runs before dev and build:
// drop the real files into /public/images and they are picked up automatically.
import { readdirSync, writeFileSync } from 'node:fs';
import { join, relative, sep, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]
  );
}

const files = walk(pub)
  .map((f) => '/' + relative(pub, f).split(sep).join('/'))
  .sort();

writeFileSync(join(root, 'lib', 'public-files.generated.json'), JSON.stringify(files, null, 2) + '\n');
console.log(`[public-manifest] ${files.length} files`);
