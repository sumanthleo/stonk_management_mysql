"use strict";

const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const new_trade_setups = sequelize.define(
    "new_trade_setups",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      market: {
        type: DataTypes.ENUM(
          "STOCK",
          "FOREX",
          "CRYPTO",
          "INDEX",
          "OPTION",
          "FUTURE"
        ),
        allowNull: false,
      },
      trade_type: {
        type: DataTypes.ENUM("LONG", "SHORT"),
        allowNull: false,
      },
      symbol: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      trade_entry_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      trade_target_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      stop_loss_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      note: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      trades_tags: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      _deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: true }
  );

  new_trade_setups.associate = function (models) {
    new_trade_setups.belongsTo(models.users, {
      foreignKey: "user_id",
      as: "user",
    });
  };

  // new_trade_setups
  //   .sync({ alter: true })
  //   .then(() => {
  //     console.log("new_trade_setups table created successfully");
  //   })
  //   .catch((err) => {
  //     console.log("Error creating table: ", err.message);
  //   });

  return new_trade_setups;
};
