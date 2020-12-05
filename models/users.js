const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
      name: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      }
    });
  }