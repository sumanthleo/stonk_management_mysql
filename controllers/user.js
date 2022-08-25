const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class User {
  /**
   * @api {put} /v1/auth/signup
   * @apiName user signup
   * @apiParam {String} signup with user name and email address and password
   * @apiParam {String}  encrypt passowrd with bcrypt package
   * @apiParam {String}  signup
   * @apiSuccessExample {json} Success-Response:
   * {
   *   "message": "Signup Success",
   * }
   */

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

  /**
   * @api {put} /v1/auth/singin
   * @apiName user signin
   * @apiParam {String} signin with email  address and password
   * @apiParam {String}  compare encrypt passowrd with user password
   * @apiParam {String}  signin
   * @apiSuccessExample {json} Success-Response:
   * {
   *    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlhY2RjNjI4LTcxOWItNDlkNy04ODBmLTE3ZGRjYTY5ZjRjNCIsImlhdCI6MTY2MTM0MDAzMn0.jDCPEUlYYLbEQCml5XPptm28_L2ZPrPwAk1sIvwgf4Q",
        "user": {
            "id": "9acdc628-719b-49d7-880f-17ddca69f4c4",
            "user_name": "someThing",
            "email": "something@gmail.com",
            "password": "$2b$10$CkBiAEjjb/1GxsVDrvDGVu.84Mpw3t/VvCEyeVpRZv80fshdZK0b6",
            "phone": null,
            "age": null,
            "profile_image": null,
            "profile_image_url": null,
            "country": null,
            "user_wallet_balance": 2300,
   * }
   */
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

  /**
   * @api {put} /v1/auth/user_update/9acdc628-719b-49d7-880f-17ddca69f4c4
   * @apiName user update
   * @apiParam {String} user_update with user name and email address and password
   * @apiParam {String}  encrypt passowrd with bcrypt package
   * @apiParam {String}  user_update
   * @apiSuccessExample {json} Success-Response:
   * {
   *   "message": "update_user Success",
   * }
   */

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
