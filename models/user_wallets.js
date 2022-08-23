"use strict";

const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const user_wallet = sequelize.define(
    "user_wallet",
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
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      topup_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      topup_type: {
        type: DataTypes.ENUM("credit", "debit"),
        allowNull: false,
      },
      topup_status: {
        type: DataTypes.ENUM("pending", "success", "failed"),
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

  user_wallet.associate = function (models) {
    user_wallet.belongsTo(models.users, {
      foreignKey: "user_id",
      as: "user",
    });
  };

  //   user_wallet
  //     .sync({ alter: true })
  //     .then(() => {
  //       console.log("user_wallet table created successfully");
  //     })
  //     .catch((err) => {
  //       console.log("Error creating table: ", err.message);
  //     });

  return user_wallet;
};
