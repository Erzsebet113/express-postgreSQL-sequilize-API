const jwt = require("jsonwebtoken");
const config = require("../app/config/auth.config.js");
const db = require("../models");
const User = db.users;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "нет токена!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "не авторизован!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
    verifyToken: verifyToken,
  };
module.exports = authJwt;