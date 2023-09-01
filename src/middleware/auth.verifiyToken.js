const jwt = require("jsonwebtoken");
const { STATUS_CODE } = require("../utils/constants");
const { handleError } = require("../middleware/errorHandler.middleware");

function verifyToken(req, res, next) {
  const token = req.cookies.access_token || req.header("x-auth-token");
  console.log(token, "ghdfghdfggggggggggg")
  if (!token) {
    return res
      .status(STATUS_CODE.UNAUTHORIZED)
      .json({ error: "Access denied, No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    console.log(req.user, "ghdfghdfggggggggggg")
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