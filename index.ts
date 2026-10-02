#!/usr/bin/env bun
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import pkg from "./package.json";
import { runWelcome } from "./src/welcome.ts";
import { askInteractiveOptions } from "./src/modules/prompt.ts";

async function main() {
  const version = pkg.version || "1.0.3";
  const argv = await yargs(hideBin(process.argv))
    .scriptName("katzu-welcome")
    .usage(`$0 v${version}\n\nPersonalized terminal welcome banner\n\nUsage: $0 [options]`)
    .option("city", {
      alias: "c",
      type: "string",
      description: "City name for weather forecast (default: auto location from IP)",
    })
    .option("interactive", {
      alias: "i",
      type: "boolean",
      description: "Run in interactive prompt mode",
      default: false,
    })
    .option("type", {
      alias: "t",
      type: "string",
      choices: ["idiom", "quote", "zen"],
      description: "Content type of greeting",
      default: "idiom",
    })
    .option("art", {
      type: "boolean",
      description: "Display ASCII face art",
      default: true,
    })
    .option("weather", {
      type: "boolean",
      description: "Display weather forecast",
      default: true,
    })
    .option("random-colors", {
      type: "boolean",
      description: "Use randomized colors for each text element",
      default: true,
    })
    .help("help", "Show help")
    .alias("h", "help")
    .version(version)
    .alias("v", "version")
    .parse();

  if (argv.interactive) {
    const promptAnswers = await askInteractiveOptions({
      city: argv.city,
      type: argv.type as "idiom" | "quote" | "zen",
    });

    await runWelcome({
      city: promptAnswers.city,
      type: promptAnswers.type,
      faceIndex: promptAnswers.faceIndex,
      showArt: argv.art,
      showWeather: argv.weather,
      useRandomColors: argv["random-colors"],
    });
  } else {
    await runWelcome({
      city: argv.city,
      type: argv.type as "idiom" | "quote" | "zen",
      showArt: argv.art,
      showWeather: argv.weather,
      useRandomColors: argv["random-colors"],
    });
  }
}

if (import.meta.main) {
  main().catch((err: unknown) => {
    if (err && typeof err === "object" && "name" in err && err.name === "ExitPromptError") {
      process.exit(0);
    }
    console.error("Error running katzu-welcome:", err);
    process.exit(1);
  });
}

export { main };
export * from "./src/index.ts";
