import { readdir, lstat } from "node:fs/promises";
import path from "node:path";
import { file as $file, write as $write } from "bun";
import MagicString, { Bundle } from "magic-string";

const fileMap = {
  html: new Bundle(),
  js: new Bundle(),
  jsx: new Bundle(),
  ts: new Bundle(),
  tsx: new Bundle(),
};

const bundle = new Bundle();

export async function bundleDir(dir: string) {
  const files = await readdir(dir);
  for (const file of files) {
    const filePath = path.resolve(dir, file);
    const stats = await lstat(filePath);
    if (stats.isDirectory()) {
      await bundleDir(filePath);
      continue;
    }
    const ext = path.extname(file);
    const absoluteExt = ext.slice(1);

    if (
      Object.keys(fileMap).includes(absoluteExt) &&
      !filePath.includes("node_modules")
    ) {
      await handleFile(ext.slice(1), filePath);
    }
  }
  const outputDir = path.resolve(import.meta.dirname, "bundled");
  const map = bundle.generateMap({
    file: path.resolve(outputDir, `bundle.txt.map`),
    includeContent: true,
  });
  await $write(path.resolve(outputDir, `bundle.txt`), bundle.toString());
  await $write(path.resolve(outputDir, `bundle.txt.map`), map.toString());

  return bundle.toString();
}

async function handleFile(ext: string, filePath: string) {
  const file = $file(filePath);
  const fileContent = await file.text();
  const content = new MagicString(fileContent);
  content.prepend(`// Path: ${filePath}\n`);
  content.append("\n//-----------END OF FILE-----------\n");

  //@ts-ignore stupid typescript
  bundle.addSource({ content, filename: filePath });
}

async function outputDir(bundle: Bundle, ext: string) {
  const outputDir = path.resolve(import.meta.dirname, "bundled");
  const map = bundle.generateMap({
    file: path.resolve(outputDir, `bundle${ext}.map`),
    includeContent: true,
  });

  await $write(path.resolve(outputDir, `bundle${ext}`), bundle.toString());
  await $write(path.resolve(outputDir, `bundle${ext}.map`), map.toString());
}
