"use strict";

const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const general_trades = sequelize.define(
    "general_trades",
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
      symbol: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      trade_type: {
        type: DataTypes.ENUM("LONG", "SHORT"),
        allowNull: false,
      },
      entry_price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      exit_price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      total_entry_price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      total_exit_price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      trade_items: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      return_price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      buy_quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      sell_quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      fee: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      return_percentage: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
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

  general_trades.associate = function (models) {
    general_trades.belongsTo(models.users, {
      foreignKey: "user_id",
      as: "user",
    });

    general_trades.hasOne(models.journal_trades, {
      foreignKey: "general_trade_id",
      as: "journal_trade",
    });
  };

  // general_trades
  //   .sync({ alter: true })
  //   .then(() => {
  //     console.log("general_trades table created successfully");
  //   })
  //   .catch((err) => {
  //     console.log("Error creating table: ", err.message);
  //   });

  return general_trades;
};
