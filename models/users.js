const { sequelize, Sequelize } = require(".");
const Note = require('./notes')

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

    User.associate = models => {
      User.hasMany(models.Note, {
        onDelete: 'cascade'
      })
    }
    return User;
  }