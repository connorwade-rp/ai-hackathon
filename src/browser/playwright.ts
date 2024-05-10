import AxeBuilder from "@axe-core/playwright";
import { chromium, type Browser, type BrowserContext } from "playwright";
import { getFixSuggestions } from "./aiSuggestions";

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
    console.log("Accessibility issues:", results.violations);

    if (results.violations.length > 0) {
      for (const issue of results.violations) {
        const suggestion = await getFixSuggestions(issue);
        console.log(`Suggestion for issue '${issue.id}':`, suggestion);
      }
    }
  } catch (e) {
    console.error(e);
  }

  await browser.close();
}
