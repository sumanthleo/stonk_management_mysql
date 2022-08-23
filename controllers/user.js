const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class User {
  async signup(req, res) {
    try {
      if (!req.body.user_name || !req.body.email || !req.body.password) {
        throw "Please provide all the required fields";
      }
      const existUserData = await models.users.findOne({
        where: { email: req.body.email },
      });
      if (existUserData) {
        res.status(406).json({
          status: 406,
          message: "User already exists",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const user = await models.users.create({
        user_name: req.body.user_name,
        email: req.body.email,
        password: hashedPassword,
      });
      res.json({
        status: 200,
        message: "successfully created",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message:
          typeof error === "string"
            ? error
            : typeof error.message === "string"
            ? error.message
            : "Something went wrong",
      });
    }
  }

  async signin(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new Error("Please fill all the fields");
      }
      const user = await models.users.findOne({ where: { email } });
      if (!user) {
        throw new Error("User not found");
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Password is incorrect");
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      res.json({
        status: 200,
        message: "successfully logged in",
        data: {
          token,
          user,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message:
          typeof error === "string"
            ? error
            : typeof error.message === "string"
            ? error.message
            : "Something went wrong",
      });
    }
  }

  async update_user(req, res) {
    try {
      const { id } = req.params;
      const { user_name, email } = req.body;
      if (!user_name || !email) {
        throw new Error("Please fill all the fields");
      }
      const user = await models.users.findOne({ where: { id } });
      if (!user) {
        throw new Error("User not found");
      }

      const updatedUser = await models.users.update(
        { user_name, email },
        { where: { id: user.id } }
      );
      res.json({
        status: 200,
        data: updatedUser,
        message: "successfully updated",
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message:
          typeof error === "string"
            ? error
            : typeof error.message === "string"
            ? error.message
            : "Something went wrong",
      });
    }
  }

  //user soft delete method
  async delete_user(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error("Please provide the id");
      }
      const user = await models.users.findOne({ where: { id } });

      if (!user) {
        throw new Error("User not found");
      }
      const deletedUser = await models.users.destroy(
        {
          is_active: false,
          _delete: true,
        },
        {
          where: { id },
        }
      );
      res.json({
        status: 200,
        message: "successfully deleted",
        data: deletedUser,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message:
          typeof error === "string"
            ? error
            : typeof error.message === "string"
            ? error.message
            : "Something went wrong",
      });
    }
  }

  //change password method
  async change_password(req, res) {
    try {
      const { id } = req.params;
      const { password } = req.body;
      if (!password) {
        throw new Error("Please provide the password");
      }
      const user = await models.users.findOne({ where: { id } });
      if (!user) {
        throw new Error("User not found");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const updatedUser = await models.users.update(
        { password: hashedPassword },
        { where: { id: user.id } }
      );
      res.json({
        status: 200,
        message: "successfully changed",
        data: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message:
          typeof error === "string"
            ? error
            : typeof error.message === "string"
            ? error.message
            : "Something went wrong",
      });
    }
  }
}

module.exports = new User();
