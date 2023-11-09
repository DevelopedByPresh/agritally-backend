import jwt from "jsonwebtoken";
import { STATUS_CODE } from "../utils/constants.js";
import { handleError } from "./errorHandler.middleware.js";

export async function auth(req, res, next) {
  try {
    let token;

    const authHeader =
      req.header("authorization") || req.header("Authorization");
    const cookieToken = req.cookies.access_token;

    if (authHeader) {
      const [scheme, headerToken] = authHeader.split(" ");
      if (scheme === "Bearer") {
        token = headerToken;
      }
    } else if (cookieToken) {
      token = cookieToken;
    }

    if (!token) {
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .json({ error: "Access denied, No token provided" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    handleError(error, res);
  }
}
