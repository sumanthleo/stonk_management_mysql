const express = require("express");
const { signup, signin } = require("../../controllers/user");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

exports.user_router = router;
