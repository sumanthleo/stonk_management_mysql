"use strict";

const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const helps = sequelize.define(
    "helps",
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
      ticket_type: {
        type: DataTypes.ENUM("BUG", "FEATURE", "QUESTION"),
        allowNull: false,
        defaultValue: "BUG",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validator: {
          len: [5, 1000],
        },
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

  helps.associate = function (models) {
    helps.belongsTo(models.users, {
      foreignKey: "user_id",
      as: "user",
    });
  };

  // helps
  //   .sync({ alter: true })
  //   .then(() => {
  //     console.log("helps table created successfully");
  //   })
  //   .catch((err) => {
  //     console.log("Error creating table: ", err.message);
  //   });
  return helps;
};
