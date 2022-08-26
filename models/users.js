"use strict";

const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      profile_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profile_image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_wallet_balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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

  users.associate = function (models) {
    users.hasOne(models.user_settings, {
      foreignKey: "user_id",
      as: "user_settings",
    });

    users.hasOne(models.user_wallet, {
      foreignKey: "user_id",
      as: "user_wallet",
    });

    users.hasMany(models.user_tags, {
      foreignKey: "user_id",
      as: "user_tags",
    });

    users.hasMany(models.user_notes, {
      foreignKey: "user_id",
      as: "user_notes",
    });

    users.hasMany(models.general_trades, {
      foreignKey: "user_id",
      as: "general_trades",
    });

    users.hasMany(models.new_trade_setups, {
      foreignKey: "user_id",
      as: "new_trade_setups",
    });
    users.hasMany(models.helps, {
      foreignKey: "user_id",
      as: "helps",
    });

    // users
    //   .sync({ alter: true })
    //   .then(() => {
    //     console.log("User table created successfully");
    //   })
    //   .catch((err) => {
    //     console.log("Error creating table: ", err.message);
    //   });
  };
  return users;
};
