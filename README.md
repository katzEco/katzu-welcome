# katzu-welcome

A personalized terminal welcome banner displaying ASCII face art, real-time weather forecasts, and words/quotes of the day — rebuilt for [Bun](https://bun.com) with TypeScript, `chalk`, `yargs`, and `@inquirer/prompts`.

## Features

- 🎭 **ASCII Art Faces**: Random or selectable classic ASCII emoticon faces.
- ☀️ **Real-time Weather**: Powered by wttr.in with native Bun `fetch`.
- 📖 **Words & Quotes of the Day**: Support for idioms, inspirational quotes, and GitHub Zen.
- 🎨 **Chalk Styling**: Vibrant colors and elegant terminal typography.
- ⚡ **CLI Arguments**: Built with `yargs` for options like `--city`, `--type`, etc.
- 💬 **Interactive Mode**: Built with `@inquirer/prompts` for interactive customization.

## Quick Start

### Install Dependencies

```bash
bun install
```

### Run

```bash
# Default greeting (auto-detected location from IP, random face, idiom of the day)
bun run start

# Or directly
bun run index.ts
```

## CLI Usage & Options

Powered by `yargs`:

```bash
katzu-welcome [options]

Options:
  -c, --city           City name for weather forecast (default: auto location from IP)
  -t, --type           Content type: "idiom", "quote", or "zen" (default: "idiom")
  -i, --interactive    Run in interactive prompt mode
      --art            Toggle ASCII face art (default: true)
      --weather        Toggle weather forecast (default: true)
      --random-colors  Use randomized colors for each text element (default: true)
  -h, --help           Show help
  -v, --version        Show version number
```

### Examples

```bash
# Custom city
bun run index.ts --city Tokyo

# Inspiring quote
bun run index.ts --type quote

# GitHub Zen
bun run index.ts --type zen

# Interactive prompt mode
bun run index.ts -i

# Themed colors without randomizer
bun run index.ts --random-colors=false
```

## Testing

Run tests with Bun's built-in test runner:

```bash
bun test
```
