const dbConfig = require("../app/config/db.config.js");
const authJwt = require('../middleware/authJwt');
const verifySignUp = require('../middleware/verifySignUp');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.notes = require("./notes.js")(sequelize, Sequelize);
db.users = require("./users.js")(sequelize, Sequelize);

db.notes.hasOne(db.users)
db.users.belongsTo(db.notes)

module.exports = db;
