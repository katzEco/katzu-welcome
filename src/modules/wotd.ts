export interface WotdItem {
  word: string;
  definition: string;
  category?: string;
}

const FALLBACK_IDIOMS: WotdItem[] = [
  { word: "Bite the bullet", definition: "To face a difficult situation with courage and fortitude.", category: "idiom." },
  { word: "Break a leg", definition: "A traditional superstition wish of good luck for a performance.", category: "idiom." },
  { word: "Piece of cake", definition: "Something that is very easy to accomplish.", category: "idiom." },
  { word: "Spill the beans", definition: "To reveal secret information unintentionally or prematurely.", category: "idiom." },
  { word: "Under the weather", definition: "Feeling slightly unwell, indisposed, or tired.", category: "idiom." },
  { word: "Burn the midnight oil", definition: "To work late into the night with great diligence.", category: "idiom." },
  { word: "Hit the nail on the head", definition: "To describe or identify something with total accuracy.", category: "idiom." },
  { word: "Call it a day", definition: "To stop what you are doing, usually for the rest of the day.", category: "idiom." },
  { word: "Once in a blue moon", definition: "Something that happens very rarely.", category: "idiom." },
  { word: "The best of both worlds", definition: "A situation where you can enjoy the advantages of two distinct things.", category: "idiom." },
  { word: "Barking up the wrong tree", definition: "Following a mistaken line of thought or action.", category: "idiom." },
  { word: "Actions speak louder than words", definition: "What you do is more significant and believable than what you say.", category: "idiom." }
];

export async function wotd(type: "idiom" | "quote" | "zen" | "random" = "idiom"): Promise<WotdItem> {
  if (type === "zen") {
    try {
      const res = await fetch("https://api.github.com/zen", {
        headers: { "User-Agent": "katzu-welcome/bun" },
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) {
        const text = (await res.text()).trim();
        return { word: text, definition: "GitHub Zen Design Philosophy", category: "zen" };
      }
    } catch {
      // fallback below
    }
  }

  if (type === "quote") {
    try {
      const res = await fetch("https://dummyjson.com/quotes/random", {
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) {
        const data = (await res.json()) as { quote: string; author: string };
        return { word: `"${data.quote}"`, definition: `- ${data.author}`, category: "quote" };
      }
    } catch {
      // fallback below
    }
  }

  // Idiom or default: pick random from curated list
  const randomIdiom = FALLBACK_IDIOMS[Math.floor(Math.random() * FALLBACK_IDIOMS.length)]!;
  return randomIdiom;
}

export default wotd;
