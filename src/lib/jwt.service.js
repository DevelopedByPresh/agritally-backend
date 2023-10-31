import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import ms from "ms"; // Don't forget to import the 'ms' library for token expiration.

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenTTL = process.env.ACCESS_TOKEN_TTL;
const issuer = process.env.ISSUER;

export class jwtService {
  static TokenError = jwt.JsonWebTokenError;

  static generateAccessToken(payload, options = {}) {
    options.issuer = issuer;
    options.expiresIn ??= Number(accessTokenTTL);

    return jwt.sign(payload, accessTokenSecret, options);
  }

  static decodeToken(token) {
    return jwt.verify(token, accessTokenSecret, { issuer: issuer });
  }
}
