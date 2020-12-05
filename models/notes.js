const { sequelize, Sequelize } = require(".");
const User = require('./users')

module.exports = (sequelize, Sequelize) => {
    const Note = sequelize.define("note", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      UserID: {
        type: Sequelize.INTEGER,
        references: {
          model: User,
          key: "UserID"
        }
      }
    });
  
    return Note;
  };
