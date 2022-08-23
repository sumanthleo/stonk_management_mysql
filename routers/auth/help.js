const express = require("express");
const { create_help } = require("../../controllers/help");


const router = express.Router();

router.post("/create_help" , create_help);

exports.help = router;
