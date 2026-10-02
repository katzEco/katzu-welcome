import chalk from "chalk";

const COLOR_FUNCTIONS = [
  (str: string) => chalk.yellow.bold(str),
  (str: string) => chalk.blue(str),
  (str: string) => chalk.cyan.bold(str),
  (str: string) => chalk.green(str),
  (str: string) => chalk.magenta.bold(str),
  (str: string) => chalk.red(str),
  (str: string) => chalk.hex("#FFA500")(str), // orange
  (str: string) => chalk.hex("#00FFAA").bold(str), // mint
  (str: string) => chalk.hex("#FF77AA")(str), // pink
  (str: string) => chalk.white.bold(str)
];

export function randomColor(text: string): string {
  const index = Math.floor(Math.random() * COLOR_FUNCTIONS.length);
  return COLOR_FUNCTIONS[index]!(text);
}

export const theme = {
  art: (str: string) => chalk.bold.cyan(str),
  weather: (str: string) => chalk.yellow(str),
  divider: () => chalk.dim("|"),
  word: (str: string) => chalk.bold.hex("#70A5FF")(str),
  category: (str: string) => chalk.dim(str),
  definition: (str: string) => chalk.italic.hex("#D1D5DB")(str)
};

export default { randomColor, theme };
