import { visit } from "./src/browser/playwright";

export function cli(args: string[]) {
  console.log(args);
}

await visit("https://www.hoodoo.digital");
