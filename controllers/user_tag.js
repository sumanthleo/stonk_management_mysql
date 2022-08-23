const models = require("../models");


class User_tags {
  async create_user_tag(req, res) {
    try {
      if (!req.user.id) {
        throw new Error("You must be logged in to create a user tag");
      }
      const {
        tag_name,
        tag_category,
        tag_description,
      } = req.body;
      if (
        !tag_name ||
        !tag_category ||
        !tag_description 
      ) {
        throw new Error("You must fill out all fields");
      }
      const user_tag = await models.user_tags.create({
        user_id: req.user.id,
        tag_name,
        tag_category,
        tag_description,
      });
      res.json({
        status: 200,
        message: "User tag created successfully",
        data: user_tag,
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

module.exports = new User_tags();