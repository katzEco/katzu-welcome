import { art } from "./modules/art.ts";
import { weather } from "./modules/weather.ts";
import { wotd } from "./modules/wotd.ts";
import { randomColor, theme } from "./modules/colors.ts";

export interface WelcomeOptions {
  city?: string;
  type?: "idiom" | "quote" | "zen";
  showArt?: boolean;
  showWeather?: boolean;
  faceIndex?: number;
  useRandomColors?: boolean;
}

export async function runWelcome(options: WelcomeOptions = {}): Promise<void> {
  const {
    city,
    type = "idiom",
    showArt = true,
    showWeather = true,
    faceIndex,
    useRandomColors = true
  } = options;

  const [weatherData, wotdData] = await Promise.all([
    showWeather ? weather(city) : Promise.resolve(""),
    wotd(type)
  ]);

  const asciiFace = showArt ? art(faceIndex) : "";

  console.log("");

  // Top header line: ASCII Face and/or Weather
  if (showArt && showWeather) {
    const formattedFace = useRandomColors ? randomColor(asciiFace) : theme.art(asciiFace);
    const formattedWeather = useRandomColors ? randomColor(weatherData) : theme.weather(weatherData);
    console.log(`    ${formattedFace}    |  ${formattedWeather}`);
  } else if (showArt) {
    const formattedFace = useRandomColors ? randomColor(asciiFace) : theme.art(asciiFace);
    console.log(`    ${formattedFace}`);
  } else if (showWeather) {
    const formattedWeather = useRandomColors ? randomColor(weatherData) : theme.weather(weatherData);
    console.log(`    ${formattedWeather}`);
  }

  // Word / Quote title
  const rawCategory = (wotdData.category || "idiom.").replace(/^\(+|\)+$/g, "");
  const categoryTag = `(${rawCategory})`;
  if (useRandomColors) {
    console.log(`  ${randomColor(wotdData.word)} ${randomColor(categoryTag)}`);
    console.log(`    ${randomColor(wotdData.definition)}`);
  } else {
    console.log(`  ${theme.word(wotdData.word)} ${theme.category(categoryTag)}`);
    console.log(`    ${theme.definition(wotdData.definition)}`);
  }

  console.log("");
}
