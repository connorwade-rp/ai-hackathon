# ai-hackathon

## Cli

To use the CLI, use:

```bash
bun link
```

You will need a .env file with your openAI info:

```
OPENAI_API_TYPE=<type>
OPENAI_API_VERSION=<version>
DEPLOYMENT_NAME=<deploymentName>
OPENAI_API_KEY=<your openai key>
OPENAI_ENDPOINT=<then endpoint for you openai instance>
```

### Commands

Run for a website:

```bash
aicheck -u=https://www.example.com -s=testing-site
aicheck --url=https://www.example.com -src=testing-site
```

`-u/--url=<your domain>` tests the website at your domain.
`-s/--src=<your codebase>` the source code for you website. This path should be relative to your current directory. For instance,
if code is the directory above you use `../`. If it is in the same directory use `./`.

## Development

To install dependencies **DO NOT FORGET TO TURN-OFF Z-SCALER**:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

## Testing Site

The testing site is a react project with tailwindcss, daisyui, and vite. It uses npm for package management since I figured that would be the most universal way of doing it.

```bash
cd ./testing-site
npm install
```

To run:

```bash
npm run dev
```

There should already be plenty of accessibility violations cuz I went out of my way to create as many issues as I could. But feel free to add as many as you'd like for testing purposes.
