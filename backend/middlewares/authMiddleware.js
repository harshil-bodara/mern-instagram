const jwt = require("jsonwebtoken");

const userAuthMiddleware = async (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(404).send({ result: "Please add token" });
  } else {
    token = token.split(" ")[1];
    jwt.verify(token, process.env.jwtKey, (err, user) => {
      req.user = user;
      next();
    });
  }
};

module.exports = { userAuthMiddleware };
