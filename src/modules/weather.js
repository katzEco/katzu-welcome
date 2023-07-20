const axios = require('axios')

const city = 'Phayao'
const link = `https://wttr.in/${city}?format=1`

async function weather() {
  const call = await axios.get(link)

  return `${city}  ${call.data}`
}

module.exports = weather
