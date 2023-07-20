const axios = require('axios')

const city = 'Phayao'
const link = `wttr.in/${city}?format=1`

async function weather() {
  const call = await axios.get(link)

  console.log(call)
}

module.exports = [weather]
