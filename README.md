# katzu-welcome

Personalized terminal welcome banner displaying ASCII kaomoji art, real-time weather forecasts, and inspiring words/quotes of the day — natively built for [Bun](https://bun.com) with TypeScript, `chalk`, `yargs`, and `@inquirer/prompts`.

---

## ✨ Features

- 🎭 **ASCII Kaomoji Art**: Randomized or index-selectable classic Japanese kaomoji face art.
- ☀️ **Real-time Live Weather**: Live weather forecast fetched from `wttr.in` with automatic IP geolocation or custom city lookup.
- 📖 **Words & Quotes of the Day**: Daily idioms with definitions (`idioms.in`), inspirational quotes with authors (`zenquotes.io`), or GitHub Zen wisdom.
- 🎨 **Dynamic Color Palettes**: Vibrant ANSI styling powered by `chalk v6` with randomized colors or clean defaults.
- ⚡ **Powerful CLI**: Full argument parser powered by `yargs` (`--city`, `--type`, `--interactive`, etc.).
- 💬 **Interactive Prompt Wizard**: Built with `@inquirer/prompts` for interactive setup.
- 🚀 **Cross-Platform Standalone Binaries**: Cross-compile self-contained executables for Linux, macOS (Apple Silicon & Intel), and Windows without requiring Bun or Node on the target machine!
- 🧪 **Fully Tested**: Built-in test suite powered by `bun test`.

---

## 🚀 Quick Start

### Run Directly

```bash
# Run with bun
bun run index.ts

# Or run via start script
bun run start
```

### Run in Watch Mode (Development)

```bash
bun run dev
```

---

## 💻 CLI Usage

```bash
katzu-welcome v1.0.3

Personalized terminal welcome banner

Usage: katzu-welcome [options]

Options:
  -c, --city           City name for weather forecast (default: auto location from IP)   [string]
  -i, --interactive    Run in interactive prompt mode                                    [boolean] [default: false]
  -t, --type           Content type of greeting: "idiom", "quote", "zen"                 [string] [default: "idiom"]
      --art            Display ASCII face art                                            [boolean] [default: true]
      --weather        Display weather forecast                                          [boolean] [default: true]
      --random-colors  Use randomized colors for each text element                       [boolean] [default: true]
  -h, --help           Show help                                                         [boolean]
  -v, --version        Show version number                                               [boolean]
```

### Examples

```bash
# Auto location with idiom of the day
bun run index.ts

# Specific city for weather
bun run index.ts --city "Tokyo"

# Inspirational quote with author
bun run index.ts --type quote

# GitHub Zen philosophy
bun run index.ts --type zen

# Interactive wizard mode (prompts for city, type, and face art)
bun run index.ts -i

# Display weather only (hide ASCII art)
bun run index.ts --art=false

# Disable random colors (use default theme)
bun run index.ts --random-colors=false
```

---

## 🛠️ Building & Cross-Compilation

`katzu-welcome` includes a cross-compilation build system ([scripts/build.ts](scripts/build.ts)) leveraging Bun's native bundler and compiler.

### Interactive Build

Run the build script to launch an interactive target selection menu:

```bash
bun run build
```

```text
? Select build target:
❯ 🚀 Build All (JS Bundle + All 5 OS/Arch Binaries)
  🐧 Linux x64 (Intel/AMD)
  🐧 Linux ARM64 (aarch64)
  🍎 macOS ARM64 (Apple Silicon)
  🍎 macOS x64 (Intel)
  🪟 Windows x64 (.exe)
  📦 JavaScript Bundle Only (dist/index.js)
  🎯 Custom Selection (Checkbox)
```

### Build Commands

| Command | Description |
| :--- | :--- |
| `bun run build` | Interactive build menu (in TTY) |
| `bun run build --all` | Builds JS bundle and all 5 OS/arch binaries without prompting |
| `bun run build:bin` | Builds only standalone binaries for all platforms |
| `bun run build:js` | Builds only the minified JavaScript bundle and TypeScript declarations |
| `bun run build --target=bun-linux-x64` | Compiles a specific OS/arch target directly |
| `bun run build --no-prompt` | Non-interactive build (defaults to all) |

### Supported Standalone Binary Targets

All compiled binaries are generated into the ignored `./dist` directory and run with zero external runtime dependencies:

| OS | Architecture | Binary Path |
| :--- | :--- | :--- |
| **Linux** | x64 (Intel/AMD) | `dist/katzu-welcome-linux-x64` |
| **Linux** | ARM64 | `dist/katzu-welcome-linux-arm64` |
| **macOS** | ARM64 (Apple Silicon M1/M2/M3/M4) | `dist/katzu-welcome-darwin-arm64` |
| **macOS** | x64 (Intel) | `dist/katzu-welcome-darwin-x64` |
| **Windows** | x64 (.exe) | `dist/katzu-welcome-windows-x64.exe` |

```bash
# Run standalone binary directly (no Bun or Node required)
./dist/katzu-welcome-linux-x64 --help
```

---

## 📚 Programmatic API

You can also import and use `katzu-welcome` as a library in your TypeScript / JavaScript projects:

```typescript
import { runWelcome, weather, art, wotd } from "katzu-welcome";

// Run the full welcome banner
await runWelcome({
  city: "Bangkok",
  type: "quote",
  showArt: true,
  showWeather: true,
  useRandomColors: true,
});

// Or use individual modules
const currentFace = art(); // Random ASCII face
const forecast = await weather("Bangkok"); // Weather summary string
const dailyQuote = await wotd("quote"); // { word: string, definition: string }
```

---

## 🧪 Testing

Run the test suite using Bun's native test runner:

```bash
bun test
```

---

## 📄 License

MIT
