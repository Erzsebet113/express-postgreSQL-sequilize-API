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
      descriptionI: {
        type: Sequelize.STRING
      },
    });

    Note.associate = models => {
      Note.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    }
  
    return Note;
  };
