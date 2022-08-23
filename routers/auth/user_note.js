const express = require("express");
const {
  create_user_note,
  get_user_notes,
  update_user_note,
  delete_user_note,
} = require("../../controllers/user_note");

const router = express.Router();

router.post("/create_notes", create_user_note);
router.get("/get_notes", get_user_notes);
router.put("/update_notes/:id", update_user_note);
router.delete("/delete_notes/:id", delete_user_note);

exports.user_note = router;
