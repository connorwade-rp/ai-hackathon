import AxeBuilder from "@axe-core/playwright";
import { chromium, type Browser, type BrowserContext } from "playwright";

async function setup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  return { browser, context };
}

export async function visit(url: string) {
  const { browser, context } = await setup();
  const page = await context.newPage();
  await page.goto(url);

  try {
    const results = await new AxeBuilder({ page }).analyze();
    console.log(results);
  } catch (e) {
    console.error(e);
  }

  await browser.close();
}
