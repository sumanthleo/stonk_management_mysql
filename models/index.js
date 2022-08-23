/* eslint-disabled */

"use strict";

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const db = {};
const dbName = process.env.DATABASE_NAME || "stonk_management";
const dbUser = process.env.DATABASE_USER || "root";
const dbPassword = process.env.DATABASE_PASS || "";
const dbHost = process.env.DATABASE_HOST || "localhost";
// const dbPort = process.env.DATABASE_PORT;

let sequelize;

console.log("!!!!!!!!!!!!!env data", dbName, dbUser, dbPassword, dbHost);

//development
sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: "mysql",
  // port: dbPort,
});

const op = Sequelize.Op;
const operatorsAliases = {
  $in: op.in,
  $or: op.or,
};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    // console.log('!!!!!!!!!!!file', file)
    // const model = sequelize['import'](path.join(__dirname, file));
    const model = require(`../models/${file}`)(sequelize, Sequelize.DataTypes);

    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
// db.Sequelize = Sequelize;
// db['op'] = op;

module.exports = db;
