const p = require('phin')

const city = 'Phayao'
const link = `https://wttr.in/${city}?format=1`

async function weather() {
  const data = await p(link)

  return `${city}  ${data.body}`
}

module.exports = weather
