const jwt = require("jsonwebtoken");
const { STATUS_CODE } = require("../utils/constants");
const { handleError } = require("../middleware/errorHandler.middleware");

function verifyToken(req, res, next) {
  // const token = req.cookies.access_token || req.header("x-auth-token");
  try {
    let token;

    const authHeader =
        req.header('authorization') || req.header('Authorization');
    const cookieToken = req.cookies.access_token;

    if (authHeader) {
        const [scheme, headerToken] = authHeader.split(' ');
        if (scheme === 'Bearer') {
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
    handleError(res, error);
  }
}

function verifyStaff(req, res, next) {
  verifyToken(req, res, () => {
    if (
      req.user &&
      (req.user.role === "staff" ||
        req.user.role === "manager" ||
        req.user.role === "owner" ||
        req.user.role === "superAdmin")
    ) {
      next();
    } else {
      return res
        .status(STATUS_CODE.FORBIDDEN)
        .json({ error: "Access denied, User is not authorized" });
    }
  });
}

function verifyManager(req, res, next) {
  verifyToken(req, res, () => {
    if (
      req.user &&
      (req.user.role === "manager" ||
        req.user.role === "owner" ||
        req.user.role === "superAdmin")
    ) {
      next();
    } else {
      return res
        .status(STATUS_CODE.FORBIDDEN)
        .json({ error: "Access denied, User is not authorized" });
    }
  });
}
function verifyOwner(req, res, next) {
  verifyToken(req, res, () => {
    if (
      req.user &&
      (req.user.role === "owner" || req.user.role === "superAdmin")
    ) {
      next();
    } else {
      return res
        .status(STATUS_CODE.FORBIDDEN)
        .json({ error: "Access denied, User is not authorized" });
    }
  });
}

function verifySuperAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user && req.user.role === "superAdmin") {
      next();
    } else {
      return res
        .status(STATUS_CODE.FORBIDDEN)
        .json({ error: "Access denied, User is not authorized" });
    }
  });
}

module.exports = {
  verifyToken,
  verifyStaff,
  verifyManager,
  verifyOwner,
  verifySuperAdmin
};