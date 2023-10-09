
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./plasmic-keen-slider.cjs.production.min.js')
} else {
  module.exports = require('./plasmic-keen-slider.cjs.development.js')
}
