const { expressjwt: jwt } = require('express-jwt')

function authenticate() {
  let api = process.env.API_URL
  return jwt({
    secret: process.env.JWT_KEY,
    algorithms: ['HS256'],
    isRevoked: isRevoked
  })
    .unless({
      path: [
        { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
        { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
        `${api}/users/login`,
        `${api}/users/register`,
        //{url: /(.*)/},
      ]
    })
}
// async function isRevoked(req, payload, done) {
//   if (!payload.isAdmin) {
//     return
//   }
//   return payload='null'
// }
async function isRevoked(req, token){ 
  if(!token.payload.isAdmin) { 
    return true; 
  } 
}

module.exports = authenticate