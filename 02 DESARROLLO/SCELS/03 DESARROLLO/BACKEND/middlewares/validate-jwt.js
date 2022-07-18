const { expressjwt: jwt } = require('express-jwt')

function authenticate() {
  let api = process.env.API_URL
  return jwt({ secret: process.env.JWT_KEY, algorithms: ['HS256'], isRevoked: isRevoked })
    .unless({
      path: [
        { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
        { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
        { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
        { url: /\/api\/v1\/orders(.*)/, methods: ['POST', 'OPTIONS'] },
        `${api}/users/login`,
        `${api}/users/register`,
      ]
    })
}
async function isRevoked(req, token) {
  if (!token.payload.isAdmin) {
    return true;
  }
}

module.exports = authenticate