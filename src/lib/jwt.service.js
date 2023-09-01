const ms = require('ms');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenTTL = process.env.ACCESS_TOKEN_TTL;
const issuer = process.env.ISSUER;

function generateJWTToken(payload, options = {}) {
  options.issuer = options.issuer || issuer;
  options.expiresIn = options.expiresIn || accessTokenTTL;
  const expirationTimestamp = Date.now() + ms(accessTokenTTL);

  
  return {
    token: jwt.sign(payload, accessTokenSecret, options),
    expiresIn: Number(expirationTimestamp),
  };
}

function decodeToken(token, options = {}) {
  options.issuer = options.issuer || issuer;

  return jwt.verify(token, accessTokenSecret, options);
}

module.exports = { generateJWTToken, decodeToken };
