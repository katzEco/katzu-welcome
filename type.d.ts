export interface WotdItem {
  word: string;
  definition: string;
  category?: string;
}

export type WotdType = "idiom" | "quote" | "zen" | "random";

export interface WelcomeOptions {
  city?: string;
  type?: "idiom" | "quote" | "zen";
  showArt?: boolean;
  showWeather?: boolean;
  faceIndex?: number;
  useRandomColors?: boolean;
}

export interface PromptOptions {
  city?: string;
  type: "idiom" | "quote" | "zen";
  faceIndex?: number;
}

export interface ThemeColors {
  art: (str: string) => string;
  weather: (str: string) => string;
  divider: () => string;
  word: (str: string) => string;
  category: (str: string) => string;
  definition: (str: string) => string;
}

export declare const FACES: readonly string[];

export declare function art(customIndex?: number): string;

export declare function weather(city?: string): Promise<string>;

export declare function wotd(type?: WotdType): Promise<WotdItem>;

export declare function randomColor(text: string): string;

export declare const theme: ThemeColors;

export declare function askInteractiveOptions(
  defaults?: { city?: string; type?: "idiom" | "quote" | "zen" }
): Promise<PromptOptions>;

export declare function runWelcome(options?: WelcomeOptions): Promise<void>;

export declare function main(): Promise<void>;

export default runWelcome;
