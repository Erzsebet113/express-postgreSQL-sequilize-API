const db = require("../models");
const User = db.users;

//name for my app is unique name like nickname, better solution probably verify by email too(add this field to db for users also)
checkDuplicateName = (req, res, next) => {
  User.findOne({
    where: {
      name: req.body.name
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "есть такой юзер"
      });
      return;
    }
  });
};

const verifySignUp = {
    checkDuplicateName: checkDuplicateName,
  };
  
  module.exports = verifySignUp;