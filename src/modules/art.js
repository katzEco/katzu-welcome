const pkgFace = require('cool-ascii-faces')

const { randomColors } = require('../functions/colorRandomize')

function faces() {
  const rtn = randomColors(pkgFace())

  return rtn
}

module.exports = faces
