const models = require("../models");

class User_note {
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

  async get_user_notes(req, res) {
    try {
      if (!req.user.id) {
        throw new Error("You must be logged in to get user notes");
      }
      const user_notes = await models.user_notes.findAll({
        where: { user_id: req.user.id },
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
