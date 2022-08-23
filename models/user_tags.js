"use strict";

const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const user_tags = sequelize.define(
    "user_tags",
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
      tag_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tag_category: {
        type: DataTypes.ENUM("STRATEGY", "SETUP", "MISC"),
        allowNull: false,
      },
      tag_description: {
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

  user_tags.associate = function (models) {
    user_tags.belongsTo(models.users, {
      foreignKey: "user_id",
      as: "user",
    });
  };

  // user_tags
  //   .sync({ alter: true })
  //   .then(() => {
  //     console.log("user_tags table created successfully");
  //   })
  //   .catch((err) => {
  //     console.log("Error creating table: ", err.message);
  //   });
  return user_tags;
};
