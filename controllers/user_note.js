const models = require("../models");

class User_note {
  /**
   * @api {put} /v1/auth/create_notes
   * @apiName create user_note
   * @apiParam {String} creating a new user_note with market conditions
   * @apiParam {String} user_note with summary
   * @apiParam {String} added with market conditions and market_volatility
   * @apiSuccessExample {json} Success-Response:
   * {
   *    "user_mood": "happy",
        "market_condition": "bad",
        "market_volatility": "high",
        "summary": "profits",
        "notes": "profit by 100%",
   * }
   */

  async create_user_note(req, res) {
    try {
      if (!req.user.id) {
        throw new Error("You must be logged in to create a user note");
      }
      const {
        user_mood,
        market_condition,
        market_volatility,
        summary,
        notes,
      } = req.body;
      if (
        !user_mood ||
        !market_condition ||
        !market_volatility ||
        !summary ||
        !notes
      ) {
        throw new Error("You must fill out all fields");
      }
      const user_note = await models.user_notes.create({
        user_id: req.user.id,
        user_mood,
        market_condition,
        market_volatility,
        summary,
        notes,
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
   * @api {put} /v1/auth/get_notes
   * @apiName get  user_note
   * @apiParam {String} creating a new user_note with market conditions
   * @apiParam {String} user_note with summary
   * @apiParam {String} added with market conditions and market_volatility
   * @apiSuccessExample {json} Success-Response:
   * {
   *       "user_mood": "happy",
            "market_condition": "bad",
            "market_volatility": "high",
            "date": null,
            "summary": "loss",
            "notes": "loss"
   * }
   */

  async get_user_notes(req, res) {
    try {
      if (!req.user.id) {
        throw new Error("You must be logged in to get user notes");
      }
      const user_notes = await models.user_notes.findAll({
        where: { user_id: req.user.id },
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "user_id",
            "id",
            "is_active",
            "_deleted",
          ],
        },
      });
      if (!user_notes) {
        throw new Error("No user notes found");
      }
      res.json({
        status: 200,
        message: "User notes retrieved successfully",
        data: user_notes,
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
   * @api {put} /v1/auth/update_notes/2646c6b6-8ad2-473a-92f6-589fd25aaa83
   * @apiName update  user_note with id
   * @apiParam {String} updating  user_note with market conditions
   * @apiParam {String} user_note with summary
   * @apiParam {String} added with market conditions and market_volatility
   * @apiSuccessExample {json} Success-Response:
   * {
   *    "user_mood": "happy",
        "market_condition": "bad",
        "market_volatility": "high",
        "date": null,
        "summary": "loss",
        "notes": "loss",
   * }
   */
  async update_user_note(req, res) {
    try {
      if (!req.user.id) {
        throw new Error("You must be logged in to update a user note");
      }
      const {
        user_mood,
        market_condition,
        market_volatility,
        summary,
        notes,
      } = req.body;
      if (
        !user_mood ||
        !market_condition ||
        !market_volatility ||
        !summary ||
        !notes
      ) {
        throw new Error("You must fill out all fields");
      }
      const user_note = await models.user_notes.findOne({
        where: { id: req.params.id },
      });
      if (!user_note) {
        throw new Error("User note not found");
      }
      const updated_user_note = await user_note.update({
        user_mood,
        market_condition,
        market_volatility,
        summary,
        notes,
      });
      res.json({
        status: 200,
        message: "User note updated successfully",
        data: updated_user_note,
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
   * @api {put} /v1/auth/update_notes/2646c6b6-8ad2-473a-92f6-589fd25aaa83
   * @apiName delete user_note with id
   * @apiParam {String} deleting  user_note with market conditions
   * @apiParam {String} user_note with summary
   * @apiParam {String} added with market conditions and market_volatility
   * @apiSuccessExample {json} Success-Response:
   * {
   *   "message":"user_note delete successfully"
   * }
   */

  async delete_user_note(req, res) {
    try {
      if (!req.user.id) {
        throw new Error("You must be logged in to delete a user note");
      }

      const user_note = await models.user_notes.findOne({
        where: { id: req.params.id },
      });

      if (!user_note) {
        throw new Error("User note not found");
      }
      await user_note.destroy();
      res.json({
        status: 200,
        message: "User note deleted successfully",
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
module.exports = new User_note();
