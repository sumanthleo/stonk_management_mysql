"use strict";

const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const journal_trades = sequelize.define(
    "journal_trades",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      general_trade_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      journal_tags: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      journal_notes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      confidence_level: {
        type: DataTypes.INTEGER,
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

  journal_trades.associate = function (models) {
    journal_trades.belongsTo(models.general_trades, {
      foreignKey: "general_trade_id",
      as: "user",
    });
  };

  // journal_trades
  //   .sync({ alter: true })
  //   .then(() => {
  //     console.log("journal_trades table created successfully");
  //   })
  //   .catch((err) => {
  //     console.log("Error creating table: ", err.message);
  //   });

  return journal_trades;
};
