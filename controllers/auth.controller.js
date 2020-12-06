const db = require("../models");
const config = require("../app/config/auth.config");
const User = db.users;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//user registration using bcrypt for password storage
exports.signup = (req, res) => {

  User.create({
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      res.send(user)
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

//User signing prob can bring email verification too here
exports.signin = (req, res) => {
  User.findOne({
    where: {
        name: req.body.name
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "нет юзера." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "invalid pass!"
        });
      }

      //sign token for 24h
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};