const models = require("../models");

class User_setting {
  /**
   * @api {put} /v1/auth/create_user_setting
   * @apiName create user setting for the current user
   * @apiParam {String} a user setting can have multiple values like currency_format  , default_order_date
   * @apiParam {String} user_setting with journal_tags
   * @apiParam {String} users setting can have a default setting for the currency
   * @apiSuccessExample {json} Success-Response:
   * {
   *   "user_id": "9acdc628-719b-49d7-880f-17ddca69f4c4",
        "currency_format": "EURO-€",
        "default_order_date": "PREVIOUS_ORDER",
        "default_grid_display": "LAST_ACTION_DATE",
        "default_symbol": "$",
        "default_quantity": 1,
        "default_journal_tag": "some",
   * }
   */
  async create_user_setting(req, res) {
    try {
      if (!req.user.id) {
        throw new Error("You must be logged in to create a user setting");
      }
      const {
        currency_format,
        default_order_date,
        default_grid_display,
        default_symbol,
        default_quantity,
        default_journal_tag,
      } = req.body;
      if (
        !currency_format ||
        !default_order_date ||
        !default_grid_display ||
        !default_symbol ||
        !default_quantity ||
        !default_journal_tag
      ) {
        throw new Error("You must fill out all fields");
      }
      const user_note = await models.user_settings.create({
        user_id: req.user.id,
        currency_format,
        default_order_date,
        default_grid_display,
        default_symbol,
        default_quantity,
        default_journal_tag,
      });
      res.json({
        status: 200,
        message: "User note created successfully",
        data: user_note,
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
   * @api {put} /v1/auth/create_user_setting
   * @apiName get user setting for the current user
   * @apiParam {String} a user setting can have multiple values like currency_format  , default_order_date
   * @apiParam {String} user_setting with journal_tags
   * @apiParam {String} users setting can have a default setting for the currency
   * @apiSuccessExample {json} Success-Response:
   * {
   *   "user_id": "9acdc628-719b-49d7-880f-17ddca69f4c4",
        "currency_format": "EURO-€",
        "default_order_date": "PREVIOUS_ORDER",
        "default_grid_display": "LAST_ACTION_DATE",
        "default_symbol": "$",
        "default_quantity": 1,
        "default_journal_tag": "some",
   * }
   */
  async get_user_setting(req, res) {
    try {
      if (!req.user.id) {
        throw new Error("You must be logged in to get a user setting");
      }
      const user_setting = await models.user_settings.findOne({
        where: { user_id: req.user.id },
      });
      if (!user_setting) {
        throw new Error("User setting not found");
      }
      res.json({
        status: 200,
        message: "User setting found successfully",
        data: user_setting,
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
module.exports = new User_setting();
