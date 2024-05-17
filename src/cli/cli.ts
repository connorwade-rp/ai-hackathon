import { visit } from "../browser/playwright";
import path from "node:path";

const argMap: { [key: string]: RegExp } = {
  url: /^(?:-u|--url)=.+$/,
  src: /^(?:-s|--src)=.+$/,
};

export type Config = {
  url: string;
  src: string;
};

const settings: Config = {
  url: "https://www.example.com",
  src: "",
};

export async function cli(args: string[]) {
  const urlIndex = args.findIndex((arg) => argMap.url.test(arg));
  const urlSet = urlIndex >= 0;
  if (!urlSet) {
    console.error("Please provide a URL with the -u flag");
    process.exit(1);
  }
  const url = args[urlIndex].split("=")[1];
  try {
    new URL(url);

    settings.url = url.toString();
  } catch (e) {
    console.error("Invalid URL provided");
    process.exit(1);
  }

  const srcIndex = args.findIndex((arg) => argMap.src.test(arg));
  const srcSet = srcIndex >= 0;
  if (!srcSet) {
    console.error("Please provide a source directory with the -s flag");
    process.exit(1);
  }
  const src = args[srcIndex].split("=")[1];
  settings.src = path.resolve(import.meta.dirname, "../../", src);

  console.log("Testing URL:", settings.url);
  await visit(settings);
}
