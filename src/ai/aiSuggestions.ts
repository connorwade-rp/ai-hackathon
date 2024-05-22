import { bundleDir } from "../codebase/bundler";
import path from "node:path";
import { write as $write } from "bun";
import prompt from "./initial_prompt.txt";
import { writeSuggestionsToFile } from "../codebase/writer";

const DEBUG_FILE = path.resolve(import.meta.dirname, "debug.json");

// Make sure to set your variables in the .env file
const endpoint = `${process.env.OPENAI_ENDPOINT}openai/deployments/${process.env.DEPLOYMENT_NAME}/chat/completions?api-version=2024-02-01`;

export interface MessageContext {
  messages: {
    role: "user" | "system";
    content: string;
  }[];
}

const messageCtx: MessageContext = {
  messages: [
    {
      role: "system",
      content: prompt,
    },
  ],
};

export async function attachCodeContext(dir: string) {
  const code = await bundleDir(dir);
  messageCtx.messages.push({
    role: "user",
    content: `CODE: ${code}`,
  });
  $write(DEBUG_FILE, JSON.stringify(messageCtx, null, 2));
}

export async function attachIssue(issue: string) {
  messageCtx.messages.push({
    role: "user",
    content: `ACCESSIBILITY ISSUE: ${issue}`,
  });
  $write(DEBUG_FILE, JSON.stringify(messageCtx, null, 2));
}

export async function getFixSuggestions() {
  try {
    console.log("Using endpoint:", endpoint);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.OPENAI_API_KEY,
      },
      body: JSON.stringify(messageCtx),
    };

    //@ts-ignore
    const response = await fetch(endpoint, requestOptions);
    const data = await response.json();

    const choices = data.choices;
    if (choices && choices.length > 0) {
      const message = choices[0].message.content.trim();
      console.log(message);
      messageCtx.messages.push({
        role: "system",
        content: message,
      });
      $write(DEBUG_FILE, JSON.stringify(messageCtx, null, 2));
      await handleSuggestions(message);
      return message;
    } else {
      throw new Error("No completion choices returned.");
    }
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return null;
  }
}

async function handleSuggestions(message: string) {
  message = message.replace("```json", "").replace("```", "");
  const suggestions = JSON.parse(message);
  await writeSuggestionsToFile(suggestions);
}
