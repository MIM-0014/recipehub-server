const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized Access",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        success: false,
        message: "Invalid Token",
      });
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyJWT;