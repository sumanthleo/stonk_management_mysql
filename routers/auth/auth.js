const express = require("express");
const { general_trade } = require("./general_trade");
const { help } = require("./help");
const { user_note } = require("./user_note");
const { user_profile_update } = require("./user_profile_update");
const { user_setting } = require("./user_setting");
const { user_tags } = require("./user_tag");
const { user_wallet } = require("./user_wallet");
const router = express.Router();

// router.post("/creates", createUser);

router.use(user_note);
router.use(user_profile_update);
router.use(user_setting);
router.use(help);
router.use(user_wallet);
router.use(user_tags);
router.use(general_trade);

module.exports = router;
