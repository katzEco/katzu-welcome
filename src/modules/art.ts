export const FACES = [
  "( ͡° ͜ʖ ͡°)",
  "(•‿•)",
  "¯\\_(ツ)_/¯",
  "(づ｡◕‿‿◕｡)づ",
  "ʕ•ᴥ•ʔ",
  "(╯°□°)╯︵ ┻━┻",
  "(ง'̀-'́)ง",
  "(｡◕‿◕｡)",
  "(⌐■_■)",
  "٩(◕‿◕｡)۶",
  "(・_・;)",
  "(♥‿♥)",
  "(¬‿¬)",
  "(⊙_⊙)",
  "(✿◠‿◠)",
  "(^_^)v",
  "(★‿★)",
  "(っ´ω`c)",
  "ಠ_ಠ",
  "(☞ﾟヮﾟ)☞"
];

export function art(customIndex?: number): string {
  if (typeof customIndex === "number" && customIndex >= 0 && customIndex < FACES.length) {
    return FACES[customIndex]!;
  }
  const randomIndex = Math.floor(Math.random() * FACES.length);
  return FACES[randomIndex]!;
}

export default art;
