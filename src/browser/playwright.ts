import AxeBuilder from "@axe-core/playwright";
import { chromium, type Browser, type BrowserContext } from "playwright";
import {
  attachCodeContext,
  attachIssue,
  getFixSuggestions,
} from "../ai/aiSuggestions";
import { write as $write } from "bun";
import path from "node:path";
import type { Config } from "../..";

async function setup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  return { browser, context };
}

export async function visit(settings: Config) {
  const { browser, context } = await setup();
  const page = await context.newPage();
  await page.goto(settings.url);

  await attachCodeContext(settings.src);

  try {
    console.log("Analyzing page...");
    const results = await new AxeBuilder({ page }).analyze();

    if (results.violations.length > 0) {
      for (const issue of results.violations) {
        await attachIssue(JSON.stringify(issue));
      }
    } else {
      console.log("No issues found!");
      return;
    }

    console.log("Getting fix suggestions...");
    await getFixSuggestions();

    await $write(
      path.resolve(import.meta.dirname, "a11y.json"),
      JSON.stringify(results.violations, null, 2)
    );
  } catch (e) {
    console.error(e);
  }

  await browser.close();
}
