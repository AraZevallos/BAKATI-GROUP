const { expressjwt: jwt } = require('express-jwt')

function authenticate() {
  return jwt({ secret: process.env.JWT_KEY, algorithms: ['HS256'] })
}
module.exports = authenticate