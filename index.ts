import { visit } from "./src/browser/playwright";

const argMap: { [key: string]: RegExp } = {
  url: /^(?:-u|--url)=.+$/,
};

const settings = {
  url: "https://www.example.com",
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

  console.log("Testing URL:", settings.url);
  await visit(settings.url);
}
