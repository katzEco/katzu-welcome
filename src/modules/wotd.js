const p = require('phin')
const link = `https://random-words-api.vercel.app/word/idiom`

async function wotd() {
  const data = await p(link)
  const JSONData = JSON.parse(data.body.toString())[0]

  return JSONData
}

module.exports = wotd