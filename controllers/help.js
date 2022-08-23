const models = require("../models");

class Helps {
  async create_help(req, res) {
    try {
      if (!req.user.id) {
        throw new Error("You must be logged in to create a help");
      }
      const { ticket_type, email, description } = req.body;
      if (!ticket_type || !email || !description) {
        throw new Error("You must fill out all fields");
      }
      const help = await models.helps.create({
        user_id: req.user.id,
        ticket_type,
        email,
        description,
      });
      res.json({
        status: 200,
        message: "Help created successfully",
        data: help,
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
module.exports = new Helps();
