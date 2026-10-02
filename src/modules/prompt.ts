import { input, select } from "@inquirer/prompts";
import { FACES } from "./art.ts";

export interface PromptOptions {
  city?: string;
  type: "idiom" | "quote" | "zen";
  faceIndex?: number;
}

export async function askInteractiveOptions(defaults?: { city?: string; type?: "idiom" | "quote" | "zen" }): Promise<PromptOptions> {
  const city = await input({
    message: "Enter city for weather forecast (leave blank for auto location from IP):",
    default: defaults?.city || ""
  });

  const type = (await select({
    message: "Select greeting content type:",
    default: defaults?.type || "idiom",
    choices: [
      { name: "Idiom of the day (classic with definition)", value: "idiom" },
      { name: "Inspirational quote (with author)", value: "quote" },
      { name: "GitHub Zen philosophy", value: "zen" }
    ]
  })) as "idiom" | "quote" | "zen";

  const faceChoice = await select({
    message: "Choose ASCII face:",
    choices: [
      { name: "Random Face", value: -1 },
      ...FACES.slice(0, 8).map((face, index) => ({
        name: `${face}`,
        value: index
      }))
    ]
  });

  return {
    city: city.trim() || undefined,
    type,
    faceIndex: faceChoice === -1 ? undefined : faceChoice
  };
}
