const color = require("bash-color");

const art = require('./modules/art')
const weather = require('./modules/weather')
const wotd = require('./modules/wotd')

function randomColors(inp) {
  let randomizer = Math.floor(Math.random() * 9);

  switch (randomizer) {
    case 1:
      return color.yellow(inp, true)

    case 2:
      return color.blue(inp)

    case 3:
      return color.cyan(inp)

    case 4:
      return color.green(inp)

    case 5:
      return color.purple(inp)

    case 6:
      return color.red(inp)

    case 7:
      return color.yellow(inp)

    case 8:
      return color.red(inp, true) 

    default:
      return color.white(inp)
  }
}

async function main() {
  const word = await wotd()

  console.log('');
  console.log(`    ${randomColors(art())}    |  ${randomColors(await weather())}`)
  console.log(`  ${randomColors(word.word)} (idiom.)`);
  console.log(`    ${randomColors(word.definition)}`);
  console.log('');
}

main()
