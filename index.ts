import { visit } from "./src/browser/playwright";

export function cli(args: string[]) {
  console.log(args);
}

const port = 5173;

await visit(`http://localhost:${port}`);
