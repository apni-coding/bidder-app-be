const { ERROR_MESSAGE } = require("../utils/propertyResolver");
const { sendErrorResponse } = require("../utils/response");
const jwt = require("jsonwebtoken");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const authenticateToken = (req, res, next) => {
  // token get
  const authHeader = req.headers["authorization"];
  
  // Extract token from 'Bearer token'
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return sendErrorResponse(res, ERROR_MESSAGE.TOKEN_REQUIRED, "", 400);
  }

  try {
    // verify token
    const decodedValue = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedValue.user_status) {
      return sendErrorResponse(res, ERROR_MESSAGE.USER_NOT_ACTIVE, "", 400);
    }

    // Attach user information to the request object
    req.user = {
      id: decodedValue.id,
      role_id: decodedValue.role_id,
      user_status: decodedValue.user_status,
    };

    // Call the next middleware or rout handler
    next();
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      400
    );
  }
};

module.exports = authenticateToken;
