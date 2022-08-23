const { sequelize } = require("../models");
const models = require("../models");

class WalletController {
  async updateWallet(req, res) {
    let t = await sequelize.transaction();
    try {
      const { id, amount } = req.body;
      if (!id || !amount) {
        throw "Please provide user_id and amount";
      }

      // updating user wallet balance
      await models.users.increment("user_wallet_balance", {
        by: amount,
        where: { id: id },
      });

      await models.user_wallet.create(
        {
          user_id: id,
          amount: amount,
          topup_date: new Date(),
          topup_type: "credit",
          topup_status: "success",
        },
        { transaction: t }
      );

      const userData = await models.users.findOne(
        {
          where: {
            id,
          },
        },
        { transaction: t }
      );
      await t.commit();
      res.status(200).json({
        status: 200,
        data: userData,
        message: "wallet updated Created successfully",
      });
    } catch (error) {
      if (t) await t.rollback();
      res.status(500).json({
        status: 500,
        message:
          typeof error === "string"
            ? error
            : typeof error.message === "string"
            ? error.message
            : "Internal server error",
      });
    }
  }

  
  async getWalletBalance(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        throw "Please provide user id";
      }
      //getting user by id by using findById method
      const userBal = await models.users.findOne({
        where: { id },
        attributes: ["user_wallet_balance"],
      });

      res.status(200).json({
        status: 200,
        data: userBal,
        message: "User balance fetched successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        message:
          typeof error === "string"
            ? error
            : typeof error.message === "string"
            ? error.message
            : "Internal server error",
      });
    }
  }
}
module.exports = new WalletController();
