"use strict";

const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const stats = sequelize.define(
    "stats",
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
      win_rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      profit_factor: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      avg_win_hold: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      avg_loss_hold: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      avg_win: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      avg_loss: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      top_win: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      top_loss: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      avg_size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      avg_daily_vol: {
        type: DataTypes.INTEGER,
        allowNull: false,
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

  stats.associate = function (models) {
    stats.belongsTo(models.users, {
      foreignKey: "user_id",
      as: "user",
    });
  };

  // stats
  //   .sync({ alter: true })
  //   .then(() => {
  //     console.log("stats table created successfully");
  //   })
  //   .catch((err) => {
  //     console.log("Error creating table: ", err.message);
  //   });
  return stats;
};
