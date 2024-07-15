const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "mysql",
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user")(sequelize, DataTypes);
db.Train = require("./train")(sequelize, DataTypes);
db.Booking = require("./booking")(sequelize, DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
