import { write as $write } from "bun";
import MagicString from "magic-string";
import path from "node:path";

interface Suggestion {
  filename: string;
  issues: string;
  code: string;
  description: string;
}

export async function writeSuggestionsToFile(suggestions: Suggestion[]) {
  for (const suggestion of suggestions) {
    const { filename, code, issues, description } = suggestion;
    const ext = path.extname(filename);
    const newFilename = filename.replace(ext, `.a11y${ext}`);
    const magicString = new MagicString(code);
    magicString.prepend(`// Accessibility issue: ${issues}\n`);
    magicString.append(`// Description: ${description}\n`);
    await $write(newFilename, magicString.toString());
  }
}
