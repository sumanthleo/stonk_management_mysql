"use strict";

const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const user_settings = sequelize.define(
    "user_settings",
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
      currency_format: {
        type: DataTypes.ENUM(
          "US_DOLLAR-$",
          "FRENCH_CANADIAN_DOLLAR-$",
          "EURO-€",
          "INDIAN_RUPEE-₹",
          "YEN-¥",
          "BRITISH_POUND_STRLING-£"
        ),
        allowNull: false,
        defaultValue: "US_DOLLAR-$",
      },
      default_order_date: {
        type: DataTypes.ENUM("PREVIOUS_ORDER", "CURRENT_DATE/TIME"),
        allowNull: false,
      },
      default_grid_display: {
        type: DataTypes.ENUM("LAST_ACTION_DATE", "TRADE_OPEN_DATE"),
        allowNull: false,
      },
      default_symbol: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      default_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      default_journal_tag: {
        type: DataTypes.STRING,
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

  user_settings.associate = function (models) {
    user_settings.belongsTo(models.users, {
      foreignKey: "user_id",
      as: "user",
    });
  };

  // user_settings
  //   .sync({ alter: true })
  //   .then(() => {
  //     console.log("user_settings table created successfully");
  //   })
  //   .catch((err) => {
  //     console.log("Error creating table: ", err.message);
  //   });
  return user_settings;
};
