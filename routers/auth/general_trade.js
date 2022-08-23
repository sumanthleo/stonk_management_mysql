const express = require("express");
const {
  createTrade,
  get_all_trades,
} = require("../../controllers/general_trade");

const router = express.Router();

router.post("/create_trade", createTrade);
router.get("/get_trades/:id", get_all_trades);

exports.general_trade = router;
