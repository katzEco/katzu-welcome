import { test, expect, describe } from "bun:test";
import { art, FACES } from "../src/modules/art.ts";
import { weather } from "../src/modules/weather.ts";
import { wotd } from "../src/modules/wotd.ts";
import { randomColor, theme } from "../src/modules/colors.ts";
import { runWelcome } from "../src/welcome.ts";

describe("ASCII Art Module", () => {
  test("art() returns a valid face", () => {
    const face = art();
    expect(FACES).toContain(face);
  });

  test("art(index) returns specific face", () => {
    expect(art(0)).toBe(FACES[0]!);
    expect(art(1)).toBe(FACES[1]!);
  });
});

describe("Weather Module", () => {
  test("weather returns a string with city name", async () => {
    const res = await weather("Bangkok");
    expect(res).toContain("Bangkok");
  });

  test("weather() returns weather using auto location when city is omitted", async () => {
    const res = await weather();
    expect(typeof res).toBe("string");
    expect(res.length).toBeGreaterThan(0);
  });
});

describe("WOTD Module", () => {
  test("wotd('idiom') returns an idiom with definition", async () => {
    const item = await wotd("idiom");
    expect(item.word).toBeDefined();
    expect(item.definition).toBeDefined();
    expect(item.category).toBe("idiom.");
  });

  test("wotd('quote') returns a quote", async () => {
    const item = await wotd("quote");
    expect(item.word).toBeDefined();
    expect(item.definition).toBeDefined();
  });

  test("wotd('zen') returns zen text", async () => {
    const item = await wotd("zen");
    expect(item.word).toBeDefined();
    expect(item.definition).toBeDefined();
  });
});

describe("Colors Module", () => {
  test("randomColor returns a non-empty string", () => {
    const colored = randomColor("hello");
    expect(colored).toContain("hello");
  });

  test("theme applies correct styling", () => {
    expect(theme.art("test")).toContain("test");
    expect(theme.weather("test")).toContain("test");
    expect(theme.word("test")).toContain("test");
  });
});

describe("Welcome Runner", () => {
  test("runWelcome executes smoothly without throwing", async () => {
    let captured = "";
    const originalLog = console.log;
    console.log = (msg?: unknown) => {
      captured += `${msg || ""}\n`;
    };

    try {
      await runWelcome({
        city: "Chiang Mai",
        type: "idiom",
        showArt: true,
        showWeather: true
      });
      expect(captured).toContain("Chiang Mai");
    } finally {
      console.log = originalLog;
    }
  });
});
