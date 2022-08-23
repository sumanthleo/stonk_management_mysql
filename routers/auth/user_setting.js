const express = require("express");
const {
  create_user_setting,
  get_user_setting,
} = require("../../controllers/user_setting");

const router = express.Router();

router.post("/create_user_setting", create_user_setting);
router.get("/get_user_setting", get_user_setting);

exports.user_setting = router;
