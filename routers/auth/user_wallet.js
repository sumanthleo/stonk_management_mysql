const express = require("express");
const {
  updateWallet,
  getWalletBalance,
} = require("../../controllers/user_wallet");

const router = express.Router();

router.post("/wallet_update", updateWallet);
router.get("/wallet_balance/:id", getWalletBalance);

exports.user_wallet = router;
