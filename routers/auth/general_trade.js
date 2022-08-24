const express = require("express");
const {
  createTrade,
  get_all_trades,
  get_trade_avgs,
} = require("../../controllers/general_trade");

const router = express.Router();

router.post("/create_trade", createTrade);
router.get("/get_trades/:id", get_all_trades);
router.get("/get_avg_trades", get_trade_avgs);

exports.general_trade = router;
