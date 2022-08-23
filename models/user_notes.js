"use strict";

const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const user_notes = sequelize.define(
    "user_notes",
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
      user_mood: {
        type: DataTypes.ENUM("happy", "neutral", "sad"),
        allowNull: false,
      },
      market_condition: {
        type: DataTypes.ENUM("good", "neutral", "bad"),
        allowNull: false,
      },
      market_volatility: {
        type: DataTypes.ENUM("low", "medium", "high"),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      notes: {
        type: DataTypes.TEXT,
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

  user_notes.associate = function (models) {
    user_notes.belongsTo(models.users, {
      foreignKey: "user_id",
      as: "user",
    });
  };

  // user_notes
  //   .sync({ alter: true })
  //   .then(() => {
  //     console.log("user_notes table created successfully");
  //   })
  //   .catch((err) => {
  //     console.log("Error creating table: ", err.message);
  //   });

  return user_notes;
};
