import { preview, build } from "vite";
import path from "node:path";
import fs from "fs";

// I'll get back to this later

/**
 *
 * @param {number} port
 */
(async (port) => {
  // check that dist is built
  try {
    const dist = path.resolve(import.meta.dir, "dist");
    fs.readdirSync(dist);
  } catch (e) {
    console.log("No dist folder found, building...");
    await build({
      root: path.resolve(import.meta.dir, "src"),
      build: {
        outDir: path.resolve(import.meta.dir, "dist"),
      },
    });
  }

  console.log(`Starting preview server on: http://localhost:${port}`);
  await preview({
    // root: path.resolve(import.meta.dir, "src"),
    // build: {
    //   outDir: path.resolve(import.meta.dir, "dist"),
    // },
    preview: {
      port: port,
      open: true,
    },
  });
})(5175);
