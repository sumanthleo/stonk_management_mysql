const express = require("express");
const { create_user_tag } = require("../../controllers/user_tag");

const router = express.Router();

router.post('/create_tag' , create_user_tag)

exports.user_tags = router;
